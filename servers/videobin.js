/* videobin resolver
 * @lscofield
 * GNU
 */
const cheerio = require('cheerio');
const json5 = require('json5');

exports.index = function (req, res) {
    const source = 'source' in req.body ? req.body.source : req.query.source;
    const html = Buffer.from(source, 'base64').toString('utf8');
    var mp4 = null;

    const $ = cheerio.load(html);
    try {
        for (var i = 0; i < $('script[type="text/javascript"]').get().length; i++) {
            const text = $('script[type="text/javascript"]').get(i);
            try {
                var jwplayer = text.children[0].data;
                if (jwplayer.includes('sources:')) {

                    const jsonRegex = /sources:\s*(\[.*?\])/;
                    var json = jsonRegex.exec(jwplayer);
                    json = json5.parse(json[1]);

                    mp4 = json[0];

                    break;
                }
            } catch (rt) { }
        }
    } catch (e) { }

    mp4 = mp4 == null ? '' : mp4;

    res.json({ status: mp4 == '' ? 'error' : 'ok', url: mp4 });
};