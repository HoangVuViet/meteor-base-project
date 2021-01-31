from ftplib import FTP
import ftplib
import os
from download_param import *
import datetime
import sys


def download_calipso(start_date,end_date,product,output_path):
    """[This function for download CALIPSO data from FTP ICARE Server]

    Args:
        start_date ([String]): [Start date to download]
        end_date ([String]): [End date to download]
        output_path ([String]): [Local folder to save downloaded file]
    """
    ftp = ftplib.FTP()
    ftp.connect(CALIPSO_HOST)
    ftp.login(CALIPSO_USER,CALIPSO_PASS)

    start = datetime.datetime.strptime(start_date, '%Y-%m-%d')
    end = datetime.datetime.strptime(end_date, '%Y-%m-%d')
    step = datetime.timedelta(days=1)
    while start <= end:
        year_str = str(start.year)
        date_str = str(start.date()).replace("-","_")
        print("Starting date: " + date_str)
        CALIPSO_ROOT = "/SPACEBORNE/" + CALIPSO_SAT + "/" + product
        data_path = CALIPSO_ROOT + "/" + year_str + "/" + date_str + "/"
        
        try:
            list_files = ftp.nlst(data_path)
            for file_name in list_files:
                base_name = os.path.basename(file_name)
                print("Downloading..." + base_name)
                ftp.retrbinary("RETR " + file_name,open(output_path + base_name , 'wb').write)
        except Exception as e:
            print (e)
            print ("No files on this date")
        start += step
    ftp.close()
#download_calipso(CALIPSO_START_DATE,CALIPSO_END_DATE,CALIPSO_PRODUCT,CALIPSO_OUT_PATH)
#python download_calipso.py "2019-01-01" "2019-02-01" "VFM.v4.20"
download_calipso(sys.argv[1],sys.argv[2],sys.argv[3],"E:/ImageTest/")