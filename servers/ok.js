/* ok.ru resolver
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

        try {
            var json = html && html.includes('VideoAutoplayPlayerC') ? $('#VideoAutoplayPlayerC').parent().attr('data-options') : $('#embedVideoC').parent().attr('data-options');
            json = JSON.parse(json).flashvars.metadata;
            json = JSON.parse(json).videos;

            for (var i = 0; i < json.length; i++) {
                if (json[i].name == 'hd') {
                    mp4 = json[i].url;
                    break;
                }
            }
            if (mp4 == null && json.length > 0)
                mp4 = json[json.length - 1].url;

        } catch (e) {
            mp4 = null;
        }

        mp4 = mp4 == null ? '' : mp4;

        res.json({ status: mp4 == '' ? 'error' : 'ok', url: mp4 });
    }
};