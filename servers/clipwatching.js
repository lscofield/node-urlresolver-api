/* clipwatching resolver
 * @lscofield
 * GNU
 */

const cheerio = require('cheerio');
const execPhp = require('exec-php');
const json5 = require('json5');
const youtubedl = require('youtube-dl');

exports.index = function (req, res) {
    const source = 'source' in req.body ? req.body.source : req.query.source;
    const mode = 'mode' in req.body ? req.body.mode : req.query.mode;
    const html = Buffer.from(source, 'base64').toString('utf8');
    var mp4 = null;

    if (mode == 'remote') {
        youtubedl.getInfo(html, [], function (err, info) {
            if (err) {
                res.json({ status: 'error', url: '' });
            } else {
                if ('entries' in info)
                    info = info.entries[0];
                else info = info;

                mp4 = 'url' in info ? info.url : '';

                res.json({ status: mp4 == '' ? 'error' : 'ok', url: mp4 });
            }
        });
    } else {
        const $ = cheerio.load(html);

        try {
            var found = '';
            for (var i = 0; i < $('script').get().length; i++) {
                const text = $('script').get(i);
                try {
                    const s = text.children[0].data;
                    if (s.includes("eval(function")) {
                        found = s;
                        break;
                    }
                } catch (rt) { }
            }

            if (found != '') {
                execPhp('../lib/unpacker.php', '/usr/bin/php', function (error, php, output) {
                    php.nodeunpack(found, function (error, result, output, printed) {
                        if (error) {
                            mp4 = '';
                        } else {

                            const jsonRegex = /sources:\s*(\[.*?\])/;
                            var json = jsonRegex.exec(result);
                            json = json5.parse(json[1]);

                            mp4 = json[0].file;
                        }

                        mp4 = mp4 == null ? '' : mp4;

                        res.json({ status: mp4 == '' ? 'error' : 'ok', url: mp4 });
                    });
                });
            } else {
                res.json({ status: 'error', url: '' });
            }
        } catch (e) {
            res.json({ status: 'error', url: '' });
        }
    }
};