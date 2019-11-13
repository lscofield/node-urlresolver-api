/* check if origin app is autorized
 * it is an optional feature
 * @lscofield
 * GNU
 */
exports.check = function (authJSON) {
    authJSON = JSON.parse(authJSON);
    if (global.config.skk == authJSON.skk && authJSON.auth != 'app_unauthorized')
        return '';
    else {
        // return a random troll video
        // if the app is unautorized
        const videos = global.config.trolls;
        var ranMP4 = videos[Math.floor(Math.random() * videos.length)];
        return ranMP4;
    }
};