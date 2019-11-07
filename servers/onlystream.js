/* onlystream resolver
 * @lscofield
 * GNU
 */

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
        const html = Buffer.from(source, 'base64').toString('utf8');
        var mp4 = null;

        if (mode == 'remote') {
            res.json({ status: 'error', url: '' });
        } else {
            const $ = cheerio.load(html);

            try {
                for (var i = 0; i < $('script[type="text/javascript"]').get().length; i++) {
                    const text = $('script[type="text/javascript"]').get(i);
                    try {
                        var jwplayer = text.children[0].data;
                        if (jwplayer.includes('sources:')) {
                            if (jwplayer.includes('v.mp4')) {
                                var mp4Regex = /file:\s*"((?:\\.|[^"\\])*v.mp4)"/g;
                                var match = mp4Regex.exec(jwplayer);
                                mp4 = match[1].includes('v.mp4') ? match[1] : null;
                            } else if (jwplayer.includes('master.m3u8')) {
                                var mp4Regex = /file:\s*"((?:\\.|[^"\\])*master.m3u8)"/g;
                                var match = mp4Regex.exec(jwplayer);
                                mp4 = match[1].includes('master.m3u8') ? match[1] : null;
                            }
                            break;
                        }
                    } catch (rt) { }
                }

                if (mp4 == null || (!mp4.includes(".mp4") && !mp4.includes(".m3u8"))) {
                    var server = $("#vplayer").children('img').attr("src");
                    server = server.split("/")[2];
                    for (var i = 0; i < $('script[type="text/javascript"]').get().length; i++) {
                        const text = $('script[type="text/javascript"]').get(i);
                        try {
                            var jwplayer = text.children[0].data;
                            if (jwplayer.includes('eval(function(')) {
                                var hash = jwplayer.split("|");

                                for (var c = 1; c < hash.length; c++) {
                                    if (hash[c] != null && hash[c] !== '' && !hash[c].includes("script")) {
                                        if (hash[c].length > 35) {
                                            mp4 = "https://" + server + "/" + hash[c] + "/v.mp4";
                                            if (mp4.length > 40) {
                                                break;
                                            }
                                        }
                                    }
                                }

                                break;
                            }
                        } catch (rt) { }
                    }
                }

                if (mp4 == null || (!mp4.includes(".mp4") && !mp4.includes(".m3u8"))) {
                    mp4 = null;
                }
            } catch (e) {
                mp4 = mp4 == null || mp4 == '' ? '' : mp4;
            }

            mp4 = mp4 == null ? '' : mp4;

            res.json({ status: mp4 == '' ? 'error' : 'ok', url: mp4 });
        }
    }
};