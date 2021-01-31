# import numpy as np
from pyhdf.SD import SD, SDC
# import csv
import pandas as pd
import numpy as np

import re
import shapefile
from shapely.geometry import shape, Point
import subprocess


import shapely
import os, glob
from process_param import *
import sys


#Check 1 file co thuoc vung Viet Nam hay khong
def check_vietnam(file_path):
    metadata = subprocess.check_output(['gdalinfo', file_path])
    path_number = abs(int(re.search('STARTPATHNUMBER=(.*?)\\r\\n', metadata.decode("utf-8")).group(1)))
    if path_number >= 227 and path_number <= 233:
        return True
    else:
        return False
#Check 1 diem co thuoc cung dang xet hay ko
def check(lon, lat, polygon):
       
	minx, miny, maxx, maxy = polygon.bounds
	bounding_box = shapely.geometry.box(minx, miny, maxx, maxy)
    #build a shapely point from your geopoint
	point = Point(lon, lat)
	if bounding_box.contains(point):
	#the contains function does exactly what you want
		return polygon.contains(point)
	return False

#Trich rut thoi gian tu ten file
def extractTime(time, dataFrame, FILE_NAME):
	
	result = re.findall(time, FILE_NAME)
	times = result[0]+' '+ result[1]
	dataFrame["Time"] = times
	return dataFrame

def VFM_AerosolType(hdf_file, dataset,FILE_SHAPE):
	
    # doc shapefile
    r = shapefile.Reader(FILE_SHAPE)

	# lay thong tin da giac
    shapes = r.shapes()
    # xay dung 1 polygon tu da giac
    polygon = shape(shapes[0])

    hdf = SD(hdf_file, SDC.READ)

    df = pd.DataFrame()

    lat = hdf.select('Latitude')
    lon = hdf.select('Longitude')
    
    lat2D = lat[:,:]
    lon2D = lon[:,:]
    
    
    
    data2D = hdf.select(dataset)
    data = data2D[:,:]
    #check and filter pixel in Vietnam boundary
    rows_del = []
    for row in range(0,len(lat2D[:,0])):
        if not check(lon2D[row], lat2D[row], polygon):
            rows_del.append(row)
    if rows_del!=[]:     
        lon2D = np.delete(lon2D, rows_del, axis=0)
        lat2D = np.delete(lat2D, rows_del, axis=0)
        data = np.delete(data, rows_del, axis=0)

    #assign Vietnam pixel to data frame         
    df['Latitude'] = lat2D[:,0]
    df['Longitude'] = lon2D[:,0]
    
    if len(data) != 0:
        for col in range(0,len(data[0,:])):
            ts = []
            for row in range(0,len(data[:,0])):
                
                dt = int(data[row, col])
                # print('DATA',j,i,'=',dt)
                b = bin(dt)
                if int(b[(len(b)-3) : len(b)], 2) == 3:
                    t = int(b[(len(b)-12):(len(b)-9)], 2)
         
                    for k in range(0,8):
                        if t == k :
                            ts.append(k)
                else:
                        ts.append(-1)
            new_col = "P_" + str(col)
            df[new_col] = ts
    return df

def process_calipso_list(input_path,dataset,output_path):
    #if not os.path.exists(output_path):
        #os.makedirs(output_path)
    time =  r'\d{1,2}[-]\d{1,2}[-]\d{1,2}|\d{4}[-]\d{1,2}[-]\d{1,2}'
    typeOf = pd.DataFrame()
    for hdf_filepath in glob.iglob(input_path + '\\' + '*.hdf'):
        if check_vietnam(hdf_filepath):
            folderpath, filename = os.path.split(hdf_filepath)
            year = filename[30:34]
            output_path_year = output_path + "/" + year
            if not os.path.exists(output_path_year):
                os.makedirs(output_path_year)
            out_file = "{}\\{}.csv".format(output_path_year, filename)
            if not os.path.exists(out_file):
                print ("Reading file: ", filename)
                df = VFM_AerosolType(hdf_filepath,dataset, FILE_SHAPE)
                df = extractTime(time, df, hdf_filepath)
                if len(df)!=0:
                    df.to_csv(out_file)
                    print(filename+ " has at least 1 point in Map")
                print(filename+ " done.")
        else:
            print("Data file not in Vietnam")
    print("Done")
def process_calipso_file(hdf_filepath,dataset,output_path):
    #if not os.path.exists(output_path):
        #os.makedirs(output_path)
    time =  r'\d{1,2}[-]\d{1,2}[-]\d{1,2}|\d{4}[-]\d{1,2}[-]\d{1,2}'
    typeOf = pd.DataFrame()
    if check_vietnam(hdf_filepath):
        folderpath, filename = os.path.split(hdf_filepath)
        year = filename[30:34]
        output_path_year = output_path + "/" + year
        if not os.path.exists(output_path_year):
            os.makedirs(output_path_year)
        out_file = "{}\\{}.csv".format(output_path_year, filename)
        if not os.path.exists(out_file):
            print ("Reading file: ", filename)
            df = VFM_AerosolType(hdf_filepath,dataset, FILE_SHAPE)
            df = extractTime(time, df, hdf_filepath)
            if len(df)!=0:
                df.to_csv(out_file)
                print(filename+ " has at least 1 point in Map")
            print(filename+ " done.")
    else:
        print("Data file not in Vietnam")
            
#process_calipso_list(CALIPSO_INPUT_PATH,DATAFIELD_NAME,CALIPSO_OUTPUT_PATH)
process_calipso_list(sys.argv[0],sys.argv[1],sys.argv[2])


