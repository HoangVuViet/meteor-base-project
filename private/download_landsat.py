import sys
import landsatxplore.api
from landsatxplore.earthexplorer import EarthExplorer
from download_param import *

def download_landsat(start_date,end_date,product,spatial_range,out_path):
    """[This function to download Landsat product]

    Args:
        start_date ([String]): [Start date to download]
        end_date ([String]): [End date to download]
        spatial_range([collection]):[(ymin,xmin,ymax,xmax) spatial range to download]
        output_path ([String]): [Local folder to save downloaded file]
        
    """
    # Initialize a new API instance and get an access key
    api = landsatxplore.api.API(LANDSAT_USER, LANDSAT_PASS)

    # Request
    scenes = api.search(
        dataset = product,
        bbox= spatial_range,
        start_date = start_date,
        end_date = end_date,
        max_cloud_cover = 10)

    print('{} scenes found.'.format(len(scenes)))
    api.logout()

    ee = EarthExplorer(LANDSAT_USER, LANDSAT_PASS)

    for scene in scenes:
        print(scene['acquisitionDate'])
        ee.download(scene_id=scene['entityId'], output_dir=out_path)
        
    ee.logout()
#download_landsat(LANDSAT_START_DATE,LANDSAT_END_DATE,LANDSAT_PRODUCT,LANDSAT_RANGE,LANDSAT_OUT_PATH)
download_landsat(sys.argv[0],sys.argv[1],sys.argv[2],sys.argv[3],sys.argv[4])
