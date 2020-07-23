/* cloudvideo resolver
 * @lscofield
 * GNU
 */
const json5 = require('json5');
const unpacker = require('../lib/unpacker');
const skkchecker = require('../lib/skkchecker');
const packedRegex = /(eval\(function\(p,a,c,k,e,d\){.*?}\(.*?\.split\('\|'\)\)\))/;
const jsonRegex = /sources\s*:\s*\[(.*?)\]/gs;

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

            try {
                const packed = packedRegex.exec(html)[1];
                const unpacked = unpacker.unPack(packed);

                const sources = jsonRegex.exec(unpacked);
                const stream = json5.parse('[' + sources[1] + ']');
                if (stream) {
                    mp4 = stream[0].src;
                    mp4 = mp4.split(',').join('');
                    mp4 = mp4.replace('.urlset/master.m3u8', '/v.mp4');
                    mp4 = mp4.replace('/hls/', '/');
                }
            } catch (err) { }

            mp4 = mp4 == null ? '' : mp4;

            res.json({ status: mp4 == '' ? 'error' : 'ok', url: mp4 });
        }
    }
};