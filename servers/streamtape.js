/* streamtape resolver
 * @lscofield
 * GNU
 */

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

        try {
            var mp4Regex = /document\.getElementById\(\'videolink\'\);\s*elem\s*\[\'innerHTML\'\]\s*=\s*\'(.*?)\'/gs;
            var match = mp4Regex.exec(html);
            mp4 = match[1];

            if (mp4 && mp4 != '' && !mp4.includes('http'))
                mp4 = "https:" + mp4;
            mp4 = mp4 && mp4 != '' ? mp4 + "&stream=1" : null;
        } catch (e) {
            mp4 = null;
        }

        mp4 = mp4 == null ? '' : mp4;

        res.json({ status: mp4 == '' ? 'error' : 'ok', url: mp4 });
    }
};