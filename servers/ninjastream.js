/* ninjastream resolver
 * @lscofield
 * GNU
 */
const fetch = require('node-fetch');
const cheerio = require('cheerio');
const skkchecker = require('../lib/skkchecker');

exports.index = function (req, res) {
    //Optional check, only if you need to restrict access
    // to unautorized apps, skk is signature and auth is 
    // unautorized signal
    // see the config file to more info
    const auth = 'auth' in req.body ? req.body.auth : req.query.auth;
    const authJSON = Buffer.from(auth, 'base64').toString('utf8');
    const granted = skkchecker.check(authJSON);
    if (granted != '') {
        // no autorized app block
        // return a random troll video
        // if the app is unautorized
        res.json({ status: 'ok', url: granted });
    } else {
        // autorized app block
        const source = 'source' in req.body ? req.body.source : req.query.source;
        const mode = 'mode' in req.body ? req.body.mode : req.query.mode;
        var html = Buffer.from(source, 'base64').toString('utf8');
        var mp4 = null;

        const extractVideo = function (data) {
            var mp4 = '';

            try {
                var videoData = data.replace(/&quot;/g, '"')
                videoData = `{${videoData.replace('host"', '"host"').replace(/\s/g, '')}}`
                var video = JSON.parse(videoData)
                mp4 = `${video.host}${video.hash}/index.m3u8`
            } catch (err) {
                mp4 = '';
            }

            return mp4;
        }

        if (mode == 'remote') {
            try {
                var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
                ip = ip && ip.includes(',') ? ip.split(",")[0].trim() : ip;
                fetch(html, {
                    headers: {
                        "REMOTE_ADDR": ip,
                        "HTTP_X_FORWARDED_FOR": ip,
                        "X-Forwarded-For": ip,
                        "HTTP_X_REAL_IP": ip,
                        "X-Real-IP": ip
                    }
                }).then(res => res.text())
                    .then(body => {
                        if (body) {
                            const $ = cheerio.load(body);
                            var app = $('#app').html();

                            var mp4Regex = /v-bind:stream\s*=\s*\"{&quot;\s*(.*?)}/gs;
                            var match = mp4Regex.exec(app);
                            mp4 = match[1] && match[1] != '' ? match[1] : "";

                            mp4 = extractVideo(mp4);
                            mp4 = mp4 == null ? '' : mp4;
                            res.json({ status: mp4 == '' ? 'error' : 'ok', url: mp4 });
                        } else {
                            res.json({ status: 'error', url: '' });
                        }
                    }).catch(err => {
                        res.json({ status: 'error', url: '' });
                    });
            } catch (er) {
                res.json({ status: 'error', url: '' });
            }

        } else {
            try {
                const $ = cheerio.load(html);
                var app = $('#app').html();

                var mp4Regex = /v-bind:stream\s*=\s*\"{&quot;\s*(.*?)}/gs;
                var match = mp4Regex.exec(app);
                mp4 = match[1] && match[1] != '' ? match[1] : "";

                mp4 = extractVideo(mp4);
            } catch (e) {
                mp4 = null;
            }

            mp4 = mp4 == null ? '' : mp4;
            res.json({ status: mp4 == '' ? 'error' : 'ok', url: mp4 });
        }
    }
};