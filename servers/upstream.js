/* upstream resolver
 * @lscofield
 * GNU
 */

const json5 = require('json5');
const skkchecker = require('../lib/skkchecker');
const unpacker = require('../lib/unpacker');
const packedRegex = /(eval\(function\(p,a,c,k,e,d\){.*?}\(.*?\.split\('\|'\)\)\))/;

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
        var html = Buffer.from(source, 'base64').toString('utf8');
        var mp4 = null;

        try {
            const packed = packedRegex.exec(html)[1];
            html = unpacker.unPack(packed);
            const jsonRegex = /sources\s*:\s*(\[.*?\])/gs;
            var json = jsonRegex.exec(html);
            json = json5.parse(json[1]);

            mp4 = json[0].file;
        } catch (e) { }

        mp4 = mp4 == null ? '' : mp4;
        res.json({ status: mp4 == '' ? 'error' : 'ok', url: mp4 });
    }
};