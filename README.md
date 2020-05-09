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
> NOTE: You can use any programing language to extract direct url, I use Java (Android)
- Supervideo
  - Extraction mode: remote
  - Source: video_url
```sh
// Example video
String video_url = "https://supervideo.tv/jiwjxtsq8t0l";
String mp4 = null;
String authJSON = "{\"auth\":\"\",\"skk\":\"your_app_key_from_config_file\"}";
String apiurl = "http://yourdomain_or_ip_address/api/v1/supervideo";

// Getting direct url through api    
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
    // is direct video url (.mp4 or .m3u8) and you can play it directly in any video player
}
```
- Supervideo
  - Extraction mode: local
  - Source: video page source code
```sh
// Example video
String video_url = "https://supervideo.tv/jiwjxtsq8t0l";
String mp4 = null;
String authJSON = "{\"auth\":\"\",\"skk\":\"your_app_key_from_config_file\"}";
String apiurl = "http://yourdomain_or_ip_address/api/v1/bitporno";

// Getting video page source code
Document document = Jsoup.connect(video_url)
           .timeout(TIMEOUT_HERE)
           .userAgent("Mozilla")
           .parser(Parser.htmlParser()).get();

// Getting direct url through api         
String obj = Jsoup.connect(apiurl)
            .timeout(TIMEOUT_HERE)
            .data("source", encodeBase64(document.toString()))
            .data("auth", encodeBase64(authJSON))
            .data("mode", "local")
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
    // is direct video url (.mp4 or .m3u8) and you can play it directly in any video player
}
```
- Uptostream
  - Extraction mode: local
  - Source: video page source code
```sh
// Example video
String video_url = "https://uptostream.com/qiwfyxphnres";
String video_id = video_url.split("/")[3];
String uptostreamAPI = "https://uptostream.com/api/streaming/source/get?token=null&file_code="+video_id;
String mp4 = null;
String authJSON = "{\"auth\":\"\",\"skk\":\"your_app_key_from_config_file\"}";
String apiurl = "http://yourdomain_or_ip_address/api/v1/uptostream";

// Getting video page source code
Document document = Jsoup.connect(uptostreamAPI)
           .timeout(TIMEOUT_HERE)
           .referrer(video_url)
           .userAgent("Mozilla")
           .parser(Parser.htmlParser()).get();

// Getting direct url through api         
String obj = Jsoup.connect(apiurl)
            .timeout(TIMEOUT_HERE)
            .data("source", encodeBase64(document.toString()))
            .data("auth", encodeBase64(authJSON))
            .data("mode", "local")
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
    // is direct video url (.mp4 or .m3u8) and you can play it directly in any video player
}
```
- Upstream
  - Extraction mode: local
  - Source: video page source code
```sh
// Example video
String video_url = "https://upstream.to/embed-h0tyapx4s21c.html";
String mp4 = null;
String authJSON = "{\"auth\":\"\",\"skk\":\"your_app_key_from_config_file\"}";
String apiurl = "http://yourdomain_or_ip_address/api/v1/upstream";

// Getting video page source code
Document document = Jsoup.connect(video_url)
           .timeout(TIMEOUT_HERE)
           .userAgent("Mozilla")
           .parser(Parser.htmlParser()).get();

// Getting direct url through api  
String obj = Jsoup.connect(apiurl)
            .timeout(TIMEOUT_HERE)
            .data("source", encodeBase64(document.toString()))
            .data("auth", encodeBase64(authJSON))
            .data("mode", "local")
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
    // is direct video url (.mp4 or .m3u8) and you can play it directly in any video player
}
```
- Bitporno
  - Extraction mode: remote
  - Source: video_url
```sh
// Example video
String video_url = "https://www.bitporno.com/v/GE9XI6GIQW";
String mp4 = null;
String authJSON = "{\"auth\":\"\",\"skk\":\"your_app_key_from_config_file\"}";
String apiurl = "http://yourdomain_or_ip_address/api/v1/bitporno";

// Getting direct url through api    
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
    // is direct video url (.mp4 or .m3u8) and you can play it directly in any video player
}
```
- Bitporno
  - Extraction mode: local
  - Source: video page source code
```sh
// Example video
String video_url = "https://www.bitporno.com/v/GE9XI6GIQW";
String mp4 = null;
String authJSON = "{\"auth\":\"\",\"skk\":\"your_app_key_from_config_file\"}";
String apiurl = "http://yourdomain_or_ip_address/api/v1/bitporno";

// Getting video page source code
Document document = Jsoup.connect(video_url)
           .timeout(TIMEOUT_HERE)
           .userAgent("Mozilla")
           .parser(Parser.htmlParser()).get();

// Getting direct url through api         
String obj = Jsoup.connect(apiurl)
            .timeout(TIMEOUT_HERE)
            .data("source", encodeBase64(document.toString()))
            .data("auth", encodeBase64(authJSON))
            .data("mode", "local")
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
    // is direct video url (.mp4 or .m3u8) and you can play it directly in any video player
}
```