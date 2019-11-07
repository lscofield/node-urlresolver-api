/* Express App for resolving stream vdeos by API
 * @lscofield
 * GNU
 */

// app.js
let express = require('express');
// Import Body parser
let bodyParser = require('body-parser');
// Initialize the app
let app = express();
// Import routes
// Important incrase this limit
app.use(bodyParser.urlencoded(
  { limit: '5mb', extended: true }));
app.use(bodyParser.json({ limit: '5mb' }));

let routes = require("./routes");
// Setup server port
const port = 80;
// Send message for default URL
app.get('/', (req, res) => res.send('Not found'));
// Use Api routes in the App
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.set({ 'content-type': 'application/json; charset=utf-8' });
  next();
});
app.use('/api/v1', routes);
// Launch app to listen to specified port
app.listen(port, function () {
  console.log("Running on port " + port);
});