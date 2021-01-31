import os, sys
import shutil
import subprocess
import glob
import shutil
from process_param import *
from os.path import basename
from datetime import datetime
from shapely.wkt import dumps, loads
from shapely.geometry import box
import string




def resample_Image(input_file,dataset,method):

	aod_550_file = 'HDF5:"'+ input_file + VIIRS_BAND
	aod_near_output = input_file.replace(".h5",AOD_NAME)
	os.system(VIIRS_REGRID.format(VIIRS_resx, VIIRS_resy, "near",aod_550_file, aod_near_output))


def resample_Image_list(input_path,dataset,method):
	arrFiles1=glob.iglob(VIIRS_PATH)
	arrFiles=sorted(arrFiles1)
	
	for filename in arrFiles:
		resample_Image(filename,dataset,method)
	#print(filename)
	print("Done")
resample_Image_list(sys.argv[0],sys.argv[1],sys.argv[2])
