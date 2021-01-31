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

	high_input_file = 'HDF4_EOS:EOS_SWATH:"'+ input_file + dataset
	ouput_path = input_file.replace(IN_FOLDER,OUT_FOLDER)

	#base_path = os.path.dirname(input_file)
	#os.makedirs(base_path)
	high_output_file =ouput_path.replace(".hdf",AOD_NAME)
	os.system(regrid_command.format(MODIS_resx, MODIS_resy, method,high_input_file, high_output_file))
	
def resample_Image_list(input_path,dataset,method):
	
	list_file = glob.iglob(MODIS_PATH)
	list_file = sorted(list_file)
	
	for file_name in list_file:
		resample_Image(file_name,dataset,method)
		#print(file_name)
	print("Done")
resample_Image_list(sys.argv[0],sys.argv[1],sys.argv[2])


