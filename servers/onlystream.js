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
                for (var i = 0; i < $('script').get().length; i++) {
                    const text = $('script').get(i);
                    try {
                        var jwplayer = text.children[0].data;
                        if (jwplayer.includes('player.updateSrc')) {
                            if (jwplayer.includes('v.mp4')) {
                                var mp4Regex = /src:\s*"((?:\\.|[^"\\])*v.mp4)"/s;
                                var match = mp4Regex.exec(jwplayer);
                                mp4 = match[1].includes('v.mp4') ? match[1] : null;
                            } else if (jwplayer.includes('master.m3u8')) {
                                var mp4Regex = /src:\s*"((?:\\.|[^"\\])*master.m3u8)"/s;
                                var match = mp4Regex.exec(jwplayer);
                                mp4 = match[1].includes('master.m3u8') ? match[1] : null;
                            }
                            break;
                        }
                    } catch (rt) { }
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