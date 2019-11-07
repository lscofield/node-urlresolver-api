/* archive resolver
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
        const url = 'url' in req.body ? req.body.url : req.query.url;
        // Cuando deje de funcionar el método de la url
        // esta variable contendrá el codigo
        // fuente de la página y se podrá hacer
        // la extracción por codigo fuente
        const html = Buffer.from(source, 'base64').toString('utf8');
        const link = Buffer.from(url, 'base64').toString('utf8');
        var mp4 = null;

        if (link.includes('/download/'))
            mp4 = link;
        else {
            const id = link.split("/")[4];
            mp4 = `https://archive.org/download/${id}/${id}.mp4`;
        }

        mp4 = mp4 == null ? '' : mp4;

        res.json({ status: mp4 == '' ? 'error' : 'ok', url: mp4 });
    }
};