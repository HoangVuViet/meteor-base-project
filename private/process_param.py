from shapely.geometry import box

DATAFIELD_NAME = 'Feature_Classification_Flags'
FILE_SHAPE = "E:/APOM_PLATFORM/data/org/SHP/vietnam.shp"
CALIPSO_INPUT_PATH = "E:/APOM_PLATFORM/data/org/SatOrgCALIPSO/2020"
CALIPSO_OUTPUT_PATH = "E:/APOM_PLATFORM/data/res/SatResCALIPSO/"
#CALIPSO_INPUT_PATH = "E:/2020"
#CALIPSO_OUTPUT_PATH = "E:/2020"


#info to insert Org
vietnam_bounds = box(100.1, 25.6, 111.8, 6.4)
MODIS_PATH = "E:/APOM_PLATFORM/data/org/SatOrgMOD04_3K/2016/*.hdf"
IN_FOLDER = "/MOD04_3K_HDF/"
OUT_FOLDER = "/MOD04_3K/"
AOD_BAND = '\":mod04:Optical_Depth_Land_And_Ocean'
AOD_NAME = "_near_org.tif"
MODIS_resx=0.025
MODIS_resy=-0.025

#regrid_command = "gdalwarp -t_srs '+proj=longlat +datum=WGS84' -tps -ot Float32 -wt Float32 -te 100.1 6.4 111.8 25.6 -tr {0} {1} -r {2} -srcnodata -9999 -dstnodata -9999 -overwrite -multi {3} {4}"

regrid_command = "gdalwarp -t_srs EPSG:4326 -tps -ot Float32 -wt Float32 -te 100.1 6.4 111.8 25.6 -tr {0} {1} -r {2} -srcnodata -9999 -dstnodata -9999 -overwrite -multi {3} {4}"


VIIRS_PATH = "E:/APOM_PLATFORM/data/org/SatOrgVIIRS/2016/*.h5"
VIIRS_REGRID  = "gdalwarp -t_srs EPSG:4326 -tps -srcnodata 65535 -dstnodata 65535 -ot Float32 -wt Float32 -te 100.1 6.4 111.8 25.6 -tr {0} {1} -r {2} -overwrite -multi {3} {4}"
VIIRS_BAND = '\"://All_Data/VIIRS-Aeros-EDR_All/AerosolOpticalDepth_at_550nm'
VIIRS_resx=0.05
VIIRS_resy=-0.05

