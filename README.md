------------------------------------- Forgive my english I am spanish. Thanks -------------------------------
# node-urlresolver-api
> A complete nodejs API to extract streaming sites video direct URLs:
> For the supported servers go to /servers.

### Requirements
- A VPS server or dedicated Server, or a server with install privileges
- (Optional) point your server IP address in a domain name to pretty API url
### Installation  
To install this API on your server you only need to
have nodejs 10.x+ installed.  
Next, install all dependencies with npm command  


### Installing nodejs 
- To install nodejs (and npm) check [this simple tutorial](https://deepmerse.es/post/how-to-install-nodejs-10-11-or-12-on-ubuntu-16-04-18-04-and-19-04-31) 


### Install dependencies
- All you need to do is clone the project with git clone
- navigate to de project folder and run this command: npm install  
- these command will be install all required dependencies from package.json
```sh
$ git clone https://github.com/lscofield/node-urlresolver-api
$ cd node-urlresolver-api
$ npm install
```

### Running the App
- Now you can start the app running the command: node app.js
- Or you can install pm2 (production mode) with: npm install -g pm2 
- And start the app running: pm2 start app.js
- To stop pm2 app you can run: pm2 stop {app_id|all}
```sh
$ node app.js
$ npm install -g pm2
$ pm2 start app.js
$ pm2 stop 0
```


### Usage (Not completed yet)
    - Can extract with video url servers
- Bitporno: Usage (Language: Java)
```sh
String mp4 = null;
String authJSON = "{\"auth\":\"\",\"skk\":\"your_app_key_from_config_file\"}";
String apiurl = "http://yourdomain_or_ip_address/api/v1/bitporno";
String obj = Jsoup.connect(apiurl)
            .timeout(TIMEOUT_HERE)
            .data("source", encodeBase64(video_url))
            .data("auth", encodeBase64(authJSON))
            .data("mode", "remote")
            .method(Connection.Method.POST)
            .ignoreContentType(true)
            .execute().body();

if(obj != null && obj.contains("url")){
    JSONObject json = new JSONObject(obj);

    if (json.getString("status").equals("ok"))
        mp4 = json.getString("url");
    // Finally mp4 contains some of these values
    // is null ==> Connection error
    // is empty ==> no link fetched or apiserver error or video go down
    // direct video url (.mp4) and you and play it directly in any video player
}
```
