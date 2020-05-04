/* vidlox resolver
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
        const html = Buffer.from(source, 'base64').toString('utf8');
        var mp4 = null;

        const $ = cheerio.load(html);
        var getUrlString = function (format, data) {
            for (var i = 0; i < data.length; i++) {
                if (data[i].includes(format)) {
                    return data[i];
                }
            }

            return '';
        }

        try {
            for (var i = 0; i < $('script[type="text/javascript"]').get().length; i++) {
                const text = $('script[type="text/javascript"]').get(i);
                try {
                    var jwplayer = text.children[0].data;
                    if (jwplayer.includes('sources:') && jwplayer.includes('v.mp4')) {
                        var exploded = (jwplayer.split('sources:')[1].split(']')[0] + "]").trim();
                        exploded = JSON.parse(exploded);
                        mp4 = getUrlString('v.mp4', exploded);
                        if (mp4 == null || mp4 == '')
                            mp4 = getUrlString('master.m3u8', exploded);
                        break;
                    }
                } catch (rt) { }
            }
        } catch (e) {
            mp4 = mp4 == null || mp4 == '' ? '' : mp4;
        }

        mp4 = mp4 == null ? '' : mp4;

        res.json({ status: mp4 == '' ? 'error' : 'ok', url: mp4 });
    }
};