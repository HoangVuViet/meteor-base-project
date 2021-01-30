from bs4 import BeautifulSoup
import requests
import os, shutil
import subprocess
import wget
import pandas as pd 
import sys
def getFileId(product = 'MOD07_L2', start='2008-10-23', stop='2008-10-23', north = 40, south=30, west = -80, east=-70, dayNightBoth='DNB'):

	url = r'http://modwebsrv.modaps.eosdis.nasa.gov/axis2/services/MODAPSservices/searchForFiles?product={0}&start={1}&stop={2}&north={3}&south={4}&west={5}&east={6}&coordsOrTiles=coords&dayNightBoth={7}'.format(product, start, stop, north, south, west, east, dayNightBoth)
	result = []
	code = requests.get(url)
	plain = code.text
	s = BeautifulSoup(plain, "lxml")
	fileIds = s.findAll('return')
	# print(fileIds)
	for x in fileIds:
		if x.string != 'No results':
			result.append(x.string)
	if result:
		return result
	return None

def getFileUrl(id_list):

	url = r'http://modwebsrv.modaps.eosdis.nasa.gov/axis2/services/MODAPSservices/getFileUrls?fileIds='
	for id_ in id_list:
		url = url + '{},'.format(id_) 
	print('url ',url)
	result = []

	code = requests.get(url)
	plain = code.text
	s = BeautifulSoup(plain, "lxml")
	fileIds = s.findAll('return')
	# print(code.status_code)
	if code.status_code == 200:
		for x in fileIds:
			result.append(x.string)
		return result
	print('ERROR ID : Could not find one or many of the ID list!')
	return None

def downloadFile(source, dest, token = 'a3Vkb2hkdHQxX2dtYWlsLmNvbTphM1ZrYjJoa2RIUXhRR2R0WVdsc0xtTnZiUT09OjE2MTEyODYzNzI6MGUyOWEyYjIyOGYyNTA5MzMyN2E2YTZjN2U3MDdiMDllZTZjNTE1Mw'):

	# cmd = r'wget -e robots=off -m -np -R .html,.tmp -nH --cut-dirs=3 "{0}" --header "Authorization: Bearer {1}" -P {2}'.format(source, token, dest)
	# print(cmd)
	cmd = 'curl -v -H "Authorization: Bearer {0}" "{1}" > {2}'.format(token, source, dest)
	# print(cmd)
	# subprocess.run(cmd)
	status = os.system(cmd)
	return status
	
def downloadladsweb(start, stop, product,north , south, west , east, dayNightBoth, filename_err='err.csv', folder_out='E:/APOM_PLATFORM/data/org/SatOrgMODIS/'
):
	#danh sach cac duong dan bi loi
	# filename_err = r'E:\FIMO\test\wget\err.csv'
	# Lay danh sach ID file
	id_list = getFileId(product, start, stop, north , south, west , east, dayNightBoth)
	# id_list = getFileId()
	list_err = []

	if id_list is not None:
		# Lay danh sach url download theo danh sach ID 
		file_url = getFileUrl(id_list)
		if file_url is not None:
			for fu in file_url: 
				print(fu)
				# thu muc tai ve
			
				filepath, filename = os.path.split(fu)
				out = folder_out + '\\' + filename
				# download file theo url 
				sts = downloadFile(fu, out)
				if sts != 0:
					list_err.append(fu)

	df = pd.DataFrame()
	df['filepath'] = list_err
	df.to_csv(filename_err)
    

# downloadladsweb('2018-10-23', '2018-10-23',"MOD04_3K", 40 , 30, -80 , -70, "DNB", 'E:/err.csv', "E:/ImageTest")
downloadladsweb(sys.argv[0],sys.argv[1],sys.argv[2],sys.argv[3],sys.argv[4],sys.argv[5],sys.argv[6],sys.argv[7],sys.argv[8],sys.argv[9])
				