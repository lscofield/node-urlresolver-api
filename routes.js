// routes.js
// Initialize express router

let router = require('express').Router();
// require config file
const config = require('./config/conf');
// config file
global.config = config;
const _servers_ = './servers/';
// Set default API response
router.get('/', function (req, res) {
    res.set({ 'content-type': 'application/json; charset=utf-8' });
    res.json({
        status: 'online',
        message: 'API online',
    });
});

//  routes
router.route('/cloudvideo').post(require(`${_servers_}cloudvideo`).index);
router.route('/onlystream').post(require(`${_servers_}onlystream`).index);
router.route('/clipwatching').post(require(`${_servers_}clipwatching`).index);
router.route('/vidoza').post(require(`${_servers_}vidoza`).index);
router.route('/vidlox').post(require(`${_servers_}vidlox`).index);
router.route('/gounlimited').post(require(`${_servers_}gounlimited`).index);
router.route('/vidia').post(require(`${_servers_}vidia`).index);
router.route('/jetload').post(require(`${_servers_}jetload`).index);
router.route('/vidcloud').post(require(`${_servers_}vidcloud`).index);
router.route('/videomega').post(require(`${_servers_}videomega`).index);
router.route('/mixdrop').post(require(`${_servers_}mixdrop`).index);
router.route('/uqload').post(require(`${_servers_}uqload`).index);
router.route('/jawcloud').post(require(`${_servers_}jawcloud`).index);
router.route('/mp4upload').post(require(`${_servers_}mp4upload`).index);
router.route('/ok').post(require(`${_servers_}ok`).index);
router.route('/vup').post(require(`${_servers_}vup`).index);
router.route('/videobin').post(require(`${_servers_}videobin`).index);
router.route('/openplay').post(require(`${_servers_}openplay`).index);
router.route('/archive').post(require(`${_servers_}archive`).index);
router.route('/veoh').post(require(`${_servers_}veoh`).index);
router.route('/gamovideo').post(require(`${_servers_}gamovideo`).index);
router.route('/streamplay').post(require(`${_servers_}streamplay`).index);
// Export API routes
module.exports = router;