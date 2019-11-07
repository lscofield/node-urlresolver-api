/* archive resolver
 * @lscofield
 * GNU
 */

exports.index = function (req, res) {
    const source = 'source' in req.body ? req.body.source : req.query.source;
    const html = Buffer.from(source, 'base64').toString('utf8');
    var mp4 = null;

    if (html.includes('/download/'))
        mp4 = html;
    else {
        const id = html.split("/")[4];
        mp4 = `https://archive.org/download/${id}/${id}.mp4`;
    }

    mp4 = mp4 == null ? '' : mp4;

    res.json({ status: mp4 == '' ? 'error' : 'ok', url: mp4 });
};