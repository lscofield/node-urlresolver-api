/* streamsb resolver
 * @lscofield
 * GNU
 */
const PythonShell = require('python-shell').PythonShell
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
        const userAgent = 'user_agent' in req.body ? req.body.user_agent : req.query.user_agent
        const video = 'video' in req.body ? req.body.video : req.query.video
        const source = 'source' in req.body ? req.body.source : req.query.source
        //var html = Buffer.from(source, 'base64').toString('utf8')
        var mp4 = null

        try {
            var options = {
                scriptPath: '/var/var/html/node-urlresolver-api/lib',
                args: [video, userAgent, source]
            }

            PythonShell.run('streamsb.py', options, function (err, results) {
                console.log(results)
                if (err)
                    mp4 = null
                else mp4 = results[0]

                mp4 = mp4 == null ? '' : mp4
                res.json({ status: mp4 == '' ? 'error' : 'ok', url: mp4 })
            });
        } catch (e) {
            mp4 = mp4 == null ? '' : mp4;
            res.json({ status: mp4 == '' ? 'error' : 'ok', url: mp4 })
        }
    }
};