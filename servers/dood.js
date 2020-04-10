/* doodstream resolver
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
        const mode = 'mode' in req.body ? req.body.mode : req.query.mode;
        const html = Buffer.from(source, 'base64').toString('utf8');
        var mp4 = null;

        try {
            if (mode == 'direct') {
                //method without embed
                var mp4Regex = /window.open\([\'|\"](.*?)[\'|\"]/gs;
                var match = mp4Regex.exec(html);
                mp4 = match[1] && match[1] != '' ? match[1] : null;
            } else {
                var token = 'token' in req.body ? req.body.token : 'token' in req.query ? req.query.token : "g603no0e44n4cg2469vebere";
                token = token == '' ? "g603no0e44n4cg2469vebere" : token;
                //method with embed
                var _0xc771 = ["\x31", "\x72\x65\x70\x6C\x61\x63\x65", "\x5A", "\x61"];
                function openPlay(_0xa287x2) {
                    var _0xa287x3 = atob(_0xa287x2[_0xc771[1]](/\//g, _0xc771[0]));
                    _0xa287x3 = atob(_0xa287x3[_0xc771[1]](/\//g, _0xc771[2]));
                    _0xa287x3 = atob(_0xa287x3[_0xc771[1]](/@/g, _0xc771[3]));
                    return _0xa287x3
                }

                function makePlay() {
                    for (var a = "", t = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789", n = t.length, o = 0; 10 > o; o++)
                        a += t.charAt(Math.floor(Math.random() * n));

                    return a + "?token=" + token + "&expiry=" + Date.now();

                }

                var dataRegex = /\/dood\?op=get_md5(.*?)[\'|\"]/gs;
                var match = dataRegex.exec(html);
                var data = match[1] && match[1] != '' ? match[1] : null;
                if (data != null)
                    mp4 = openPlay(data) + makePlay();
            }
        } catch (e) {
            mp4 = null;
        }

        mp4 = mp4 == null ? '' : mp4;

        res.json({ status: mp4 == '' ? 'error' : 'ok', url: mp4 });
    }
};
