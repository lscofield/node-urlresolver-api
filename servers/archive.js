/* archive resolver
 * @lscofield
 * GNU
 */

exports.index = function (req, res) {
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
};