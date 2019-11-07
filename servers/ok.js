/* ok.ru resolver
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
        var json = $('#VideoAutoplayPlayerC').parent().attr('data-options');
        json = JSON.parse(json).flashvars.metadata;
        json = JSON.parse(json).videos;
    
        for(var i = 0; i < json.length; i++){
            if(json[i].name == 'sd'){
                mp4 = json[i].url;
                break;
            }
        }
        if(mp4 == null && json.length > 0)
            mp4 = json[json.length-1].url;
        
    } catch (e) {
        mp4 = null;
    }

    mp4 = mp4 == null ? '' : mp4;

    res.json({ status: mp4 == '' ? 'error' : 'ok', url: mp4 });
};