/* clipwatching resolver
 * @lscofield
 * GNU
 */

const youtubedl = require('youtube-dl');

exports.index = function (req, res) {
    var url = Buffer.from(req.body.source, 'base64').toString('utf8');
    const options = [];
    var mp4 = '';

    youtubedl.getInfo(url, options, function (err, info) {
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
};