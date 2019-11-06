/* vidcloud resolver
 * @lscofield
 * GNU
 */

exports.index = function (req, res) {
    // En el body hay: player, source y url
    // Cuando empiece a fallar la obtención por player (json que devuelve https://vidcloud.co/player?fid=id_file&page=video)
    // Implementa la de source (codigo fuente de la pagina en embed)
    // o implementa la de url (url del video --> probar obtener desde aquí)
    const source = 'player' in req.body ? req.body.player : req.query.player;
    const html = Buffer.from(source, 'base64').toString('utf8');
    var mp4 = null;

    try {
        var json = JSON.parse(html);
        if(json && json.status){
            json = (json.html).split("[{")[1].split("}]")[0];
            json = JSON.parse("[{" + json.split('\\').join('') + "}]");
            mp4 = json[0].file;
        }

        if (mp4 == null || mp4 == '') 
            mp4 = null;
    } catch (e) {
        mp4 = mp4 == null ? '' : mp4;
    }

    mp4 = mp4 == null ? '' : mp4;

    res.json({ status: mp4 == '' ? 'error' : 'ok', url: mp4 });
};