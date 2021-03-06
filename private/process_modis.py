import os, sys
import shutil
import subprocess
import glob
import shutil
#import shapely
from os.path import basename
from datetime import datetime
from process_param import *
from shapely.wkt import dumps, loads
import string
import sys

def resample_Image(input_file,dataset,method):

	high_input_file = 'HDF4_EOS:EOS_SWATH:\"'+ str(input_file) + dataset
	print(high_input_file)
	ouput_path = input_file.replace(IN_FOLDER,OUT_FOLDER)

	#base_path = os.path.dirname(input_file)
	#os.makedirs(base_path)
	high_output_file =ouput_path.replace(".hdf",AOD_NAME)
	print(high_output_file)
	os.system(regrid_command.format(MODIS_resx, MODIS_resy, method,high_input_file, high_output_file))
	
def resample_Image_list(input_path,dataset,method):
	input_path = input_path + "*.hdf"
	print(input_path)
	list_file = glob.iglob(input_path)
	list_file = sorted(list_file)
	#print(list_file)

	for file_name in list_file:
		resample_Image(file_name,dataset,method)
		#print(file_name)
	print("Done")
#python process_modis.py "E:/ImageTest/"
resample_Image_list(str(sys.argv[1]),AOD_BAND,"near")


