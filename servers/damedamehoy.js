/* damedamehoy resolver
 * @lscofield
 * GNU
 */
const fetch = require('node-fetch');
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

        if (mode == 'remote') {
            try {
                var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
                ip = ip && ip.includes(',') ? ip.split(",")[0].trim() : ip;
                var url = `https://damedamehoy.xyz/details.php?v=${html.split('#')[1]}`;
                fetch(url, {
                    headers: {
                        "REMOTE_ADDR": ip,
                        "HTTP_X_FORWARDED_FOR": ip,
                        "X-Forwarded-For": ip,
                        "HTTP_X_REAL_IP": ip,
                        "X-Real-IP": ip,
                        "x-requested-with": "XMLHttpRequest"
                    }
                }).then(res => res.text())
                    .then(body => {
                        if (body) {
                            var json = JSON.parse(body);
                            if (json && 'file' in json && json.status == 200) {
                                mp4 = json.file;
                            } else mp4 = '';
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
            res.json({ status: 'error', url: '' });
        }
    }
};