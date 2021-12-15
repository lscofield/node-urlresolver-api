import re
import requests
import sys
import base64

def get_media_url():
    host = 'embedsb.com'
    media_id = sys.argv[1]
    headers = {'User-Agent': sys.argv[2],
                'Referer': 'https://{0}/'.format(host)
    }

    html = base64.b64decode(sys.argv[3]).decode('utf-8')
    sources = re.findall(r'download_video([^"]+)[^\d]+\d+x(\d+)', html)
    if sources:
        sources.sort(key=lambda x: int(x[1]), reverse=True)
        sources = [(x[1] + 'p', x[0]) for x in sources]
        code, mode, hash = eval(sources[0][1])
        dl_url = 'https://{0}/dl?op=download_orig&id={1}&mode={2}&hash={3}'.format(host, code, mode, hash)
        # get the mp4 url from client side making a get request from dl_url
        # and getting the url from html like below    
        #r = re.search('href="([^"]+)">Direct', html)
        if dl_url:
            print(dl_url)
        else:
            print('ERROR')

get_media_url()