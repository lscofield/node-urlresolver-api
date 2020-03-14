/* mediafire resolver
 * @lscofield
 * GNU
 */
const cheerio = require('cheerio');

exports.index = function (req, res) {
    // autorized app block
    const source = 'source' in req.body ? req.body.source : req.query.source;
    const html = Buffer.from(source, 'base64').toString('utf8');
    var file = null;

    const $ = cheerio.load(html);

    try {
        file = $('#download_link a.input.popsok').attr('href');
    } catch (e) {
        file = null;
    }

    file = file == null ? '' : file;

    res.json({ status: file == '' ? 'error' : 'ok', url: file });
};