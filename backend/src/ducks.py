import requests

def getDuck():
    ROOT_LINK = 'https://thispersondoesnotexist.com/'
    res = requests.get(ROOT_LINK)
    print(res.content)
    #res.headers['content-type: application/json']
    #duck = res.json()['url']
    #return duck
    

if __name__=="__main__":
    print(getDuck())