/* streamtape resolver
 * @lscofield
 * GNU
 */

const skkchecker = require('../lib/skkchecker')

exports.index = function (req, res) {
    //Optional check, only if you need to restrict access
    // to unautorized apps, skk is signature and auth is 
    // unautorized signal
    // see the config file to more info
    const auth = 'auth' in req.body ? req.body.auth : req.query.auth;
    const authJSON = Buffer.from(auth, 'base64').toString('utf8');
    const granted = skkchecker.check(authJSON);
    if (granted != '') {
        // no autorized app block
        // return a random troll video
        // if the app is unautorized
        res.json({ status: 'ok', url: granted });
    } else {
        // autorized app block
        const source = 'source' in req.body ? req.body.source : req.query.source;
        const html = Buffer.from(source, 'base64').toString('utf8');
        var mp4 = null;

        try {
            /*var t1 = html.split('div id="ideoolink')
            var t2 = t1[1].split(">")
            var t3 = t2[1].split("<")*/
            var t1 = html.split('document.getElementById(\'ideoolink\').innerHTML = "')
            var t3 = t1[1].split('"')

            var t4 = t3[1].split('(')[1]
            var t5 = t4.split("'")[1]
            t3 = t5.split('?')[1]

            if (t3)
                mp4 = 'https://streamtape.com/get_video?' + t3
            if (mp4) mp4 = mp4 + "&stream=1"
            /*const regexp = /\(\'\w+\'\)\.innerHTML\s*\=\s*(.*?)\;/g
            const matches = html.matchAll(regexp)

            var _matches = []
            for (const _match of matches)
                _matches.push(_match[1])

            var divc = _matches[_matches.length - 1]

            divc = divc.split("'").join('"')
            var inner = divc.split("+")
            var result = ''

            for (var i = 0; i < inner.length; i++) {
                var sline = inner[i].trim()
                var mp4Regex = /\(?\"([^\"]+)\"\)?(\.substring\((\d+)\))?(\.substring\((\d+)\))?/
                var match = mp4Regex.exec(sline)
                if (match)
                    if (match.length > 5 && match[3] && match[5])
                        result += (match[1].substr(match[3])).substr(match[5])
                    else if (match[3])
                        result += match[1].substr(match[3])
                    else result += match[1]
            }

            mp4 = result
            mp4 += "&stream=1"
            if (mp4[0] === "/") mp4 = "https:/" + mp4*/
        } catch (e) {
            mp4 = null;
        }

        mp4 = mp4 == null ? '' : mp4;

        res.json({ status: mp4 == '' ? 'error' : 'ok', url: mp4 })
    }
};