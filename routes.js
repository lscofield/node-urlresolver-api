// routes.js
// Initialize express router
let router = require('express').Router();
// Set default API response
router.get('/', function (req, res) {
    res.set({ 'content-type': 'application/json; charset=utf-8' });
    res.json({
        status: 'online',
        message: 'API online',
    });
});

// paths
var cloudvideo = require('./servers/cloudvideo');
var clipwatching = require('./servers/clipwatching');
var onlystream = require('./servers/onlystream');
var vidoza = require('./servers/vidoza');
var vidlox = require('./servers/vidlox');
var gounlimited = require('./servers/gounlimited');
var vidia = require('./servers/vidia');
var jetload = require('./servers/jetload');
var vidcloud = require('./servers/vidcloud');
var videomega = require('./servers/videomega');

//  routes
router.route('/cloudvideo').post(cloudvideo.index);
router.route('/onlystream').post(onlystream.index);
router.route('/clipwatching').post(clipwatching.index);
router.route('/vidoza').post(vidoza.index);
router.route('/vidlox').post(vidlox.index);
router.route('/gounlimited').post(gounlimited.index);
router.route('/vidia').post(vidia.index);
router.route('/jetload').post(jetload.index);
router.route('/vidcloud').post(vidcloud.index);
router.route('/videomega').post(videomega.index);
// Export API routes
module.exports = router;