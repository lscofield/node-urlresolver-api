/* clipwatching resolver
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
                const jsonRegex = /sources:\s*(\[.*?\])/s;
                var json = jsonRegex.exec(html);
                json = json5.parse(json[1]);

                mp4 = json[0] ? 'src' in json[0] ? json[0].src : json[0] : null;
                // try {
                //  if (req.get('user-agent').includes('axios'))
                mp4 = mp4 && mp4.endsWith('master.m3u8') ? mp4.replace('/hls/', '/').split(',').join('').replace('.urlset/master.m3u8', '/v.mp4') : mp4;
                //} catch (ef) { }

            } catch (e) { }

            mp4 = mp4 == null ? '' : mp4;

            res.json({ status: mp4 == '' ? 'error' : 'ok', url: mp4 });
        }
    }
};