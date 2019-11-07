// routes.js
// Initialize express router
let router = require('express').Router();
const _servers_ = './servers/';
// Set default API response
router.get('/', function (req, res) {
    res.set({ 'content-type': 'application/json; charset=utf-8' });
    res.json({
        status: 'online',
        message: 'API online',
    });
});

// paths
var cloudvideo = require(`${_servers_}cloudvideo`);
var clipwatching = require(`${_servers_}clipwatching`);
var onlystream = require(`${_servers_}onlystream`);
var vidoza = require(`${_servers_}vidoza`);
var vidlox = require(`${_servers_}vidlox`);
var gounlimited = require(`${_servers_}gounlimited`);
var vidia = require(`${_servers_}vidia`);
var jetload = require(`${_servers_}jetload`);
var vidcloud = require(`${_servers_}vidcloud`);
var videomega = require(`${_servers_}videomega`);
var mixdrop = require(`${_servers_}mixdrop`);
var uqload = require(`${_servers_}uqload`);
var jawcloud = require(`${_servers_}jawcloud`);
var mp4upload = require(`${_servers_}mp4upload`);
var ok = require(`${_servers_}ok`);
var vup = require(`${_servers_}vup`);
var videobin = require(`${_servers_}videobin`);

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
router.route('/mixdrop').post(mixdrop.index);
router.route('/uqload').post(uqload.index);
router.route('/jawcloud').post(jawcloud.index);
router.route('/mp4upload').post(mp4upload.index);
router.route('/ok').post(ok.index);
router.route('/vup').post(vup.index);
router.route('/videobin').post(videobin.index);
// Export API routes
module.exports = router;