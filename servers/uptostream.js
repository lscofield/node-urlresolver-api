/* uptostream resolver
 * @lscofield
 * GNU
 */

const skkchecker = require("../lib/skkchecker");
var atob = require("atob");

exports.index = function (req, res) {
  //Optional check, only if you need to restrict access
  // to unautorized apps, skk is signature and auth is
  // unautorized signal
  // see the config file to more info
  const auth = "auth" in req.body ? req.body.auth : req.query.auth;
  const authJSON = Buffer.from(auth, "base64").toString("utf8");
  const granted = skkchecker.check(authJSON);
  if (granted != "") {
    // no autorized app block
    // return a random troll video
    // if the app is unautorized
    res.json({ status: "ok", url: granted });
  } else {
    // autorized app block
    const source = "source" in req.body ? req.body.source : req.query.source;
    var html = Buffer.from(source, "base64").toString("utf8");
    var mp4 = null;

    var jsonRegex = /sources\s*"\s*:\s*"(.*?)"/gs;
    var match = jsonRegex.exec(html);
    var code = match && match[1] ? match[1] : "";

    code = code.replace("\\/=+$\\/", "/=+$/");
    code = code.split("window").join("this");
    var regexReturn = /return\n/g;
    code = code.replace(regexReturn, "return ");
    eval(code);

    try {
      if (sources && sources.length > 0)
        mp4 = sources[0].src;
    } catch (errr) {
    }
    mp4 = mp4 == null ? "" : mp4;

    res.json({ status: mp4 == "" ? "error" : "ok", url: mp4 });
  }
};