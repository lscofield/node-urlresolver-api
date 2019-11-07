/* vup.to resolver
 * @lscofield
 * GNU
 */

const cheerio = require('cheerio');
const youtubedl = require('youtube-dl');

exports.index = function (req, res) {
    const source = 'source' in req.body ? req.body.source : req.query.source;
    const mode = 'mode' in req.body ? req.body.mode : req.query.mode;
    const html = Buffer.from(source, 'base64').toString('utf8');
    var mp4 = null;

    if (mode == 'remote') {
        const options = [];
        mp4 = '';
        youtubedl.getInfo(html, options, function (err, info) {
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
            for (var i = 0; i < $('script[type="text/javascript"]').get().length; i++) {
                const text = $('script[type="text/javascript"]').get(i);
                try {
                    var jwplayer = text.children[0].data;
                    if (jwplayer.includes('sources:') && (jwplayer.includes('.m3u8') || jwplayer.includes('.mp4'))) {
                       
                        var json = jwplayer.split("[{")[1].split("}]")[0];
                        json = "[{" + json + "}]";
                        json = json.split('src:').join('"src":');
                        json = json.split('type:').join('"type":');
                        json = JSON.parse(json);
                        
                        mp4 = json[0].src;

                        break;
                    }
                } catch (rt) { }
            }
        } catch (e) {  }

        mp4 = mp4 == null ? '' : mp4;

        res.json({ status: mp4 == '' ? 'error' : 'ok', url: mp4 });
    }
};