/* vup.to resolver
 * @lscofield
 * GNU
 */

const cheerio = require('cheerio');
const json5 = require('json5');
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
                        if (jwplayer.includes('sources:') && (jwplayer.includes('.m3u8') || jwplayer.includes('.mp4'))) {

                            var json = jwplayer.split("[{")[1].split("}]")[0];
                            json = "[{" + json + "}]";
                            json = json5.parse(json);

                            mp4 = json[0].src;

                            break;
                        }
                    } catch (rt) { }
                }
            } catch (e) { }

            mp4 = mp4 == null ? '' : mp4;

            res.json({ status: mp4 == '' ? 'error' : 'ok', url: mp4 });
        }
    }
};