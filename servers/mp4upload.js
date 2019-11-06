/* mp4upload resolver
 * @lscofield
 * GNU
 */

const cheerio = require('cheerio');

exports.index = function (req, res) {
    const source = 'source' in req.body ? req.body.source : req.query.source;
    const html = Buffer.from(source, 'base64').toString('utf8');
    var mp4 = null;

    const $ = cheerio.load(html);

    try {
        mp4 = $('video').first().attr('src');
    } catch (e) {
        mp4 = null;
    }

    mp4 = mp4 == null ? '' : mp4;

    res.json({ status: mp4 == '' ? 'error' : 'ok', url: mp4 });
};