/* supervideo resolver
 * @lscofield
 * GNU
 */
const fetch = require('node-fetch');
const skkchecker = require('../lib/skkchecker');
const unpacker = require('../lib/unpacker');
const packedRegex = /(eval\(function\(p,a,c,k,e,d\){.*?}\(.*?\.split\('\|'\)\)\))/;

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
                data = data.split('file').join('"file"')
                data = data.split('label').join('"label"')
                data = `[${data}]`;
                data = JSON.parse(data);

                for (var i = 0; i < data.length; i++) {
                    mp4 = data[i].file;
                    if (mp4.endsWith("v.mp4"))
                        break;
                }

                if (mp4.endsWith("master.m3u8")) {
                    mp4 = mp4.replace("hls/", "");
                    mp4 = mp4.replace(",.urlset/master.m3u8", "/v.mp4");
                }
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
                            const packed = packedRegex.exec(body)[1];
                            body = unpacker.unPack(packed);

                            var mp4Regex = /sources\s*:\s*\[(.*?)\]/gs;
                            var match = mp4Regex.exec(body);
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
                const packed = packedRegex.exec(html)[1];
                html = unpacker.unPack(packed);

                var mp4Regex = /sources\s*:\s*\[(.*?)\]/gs;
                var match = mp4Regex.exec(html);
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