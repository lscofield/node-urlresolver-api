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
config.servers.forEach(server => {
    router.route(`/${server}`).post(require(`${_servers_}${server}`).index);
});
// Export API routes
module.exports = router;