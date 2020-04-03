/* powvideo resolver
 * @lscofield
 * GNU
 */

const execPhp = require('exec-php');
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
        var source = 'source' in req.body ? req.body.source : req.query.source;
        var mp4 = null;

        try {
            execPhp('../lib/powvideo.php', '/usr/bin/php', function (error, php, output) {
                php.powvideo(source, function (error, result, output, printed) {
                    if (error) {
                        mp4 = '';
                    } else {
                        mp4 = result && (result.includes('v.mp4') || result.includes('.m3u8')) ? result : '';
                    }

                    mp4 = mp4 == null ? '' : mp4;

                    res.json({ status: mp4 == '' ? 'error' : 'ok', url: mp4 });
                });
            });
        } catch (e) {
            res.json({ status: 'error', url: '' });
        }
    }
};