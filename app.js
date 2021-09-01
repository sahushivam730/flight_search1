var express = require("express");
var session = require("express-session");
var date = require("date-and-time");
var momentjs = require("moment");
var fs = require("fs");
const flash = require('connect-flash');
const bodyParser = require("body-parser")
var Functions = require("./libs/functions.js");
const hostname = 'http://localhost:8082/'
var mysql = require("./libs/mysql.js");

// create server// 
const app = express();
const port = 8082
var server = require('http').createServer(app);


server.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});
app.set('port', process.env.port || port);
// create server// 

// error hanling //
process.on('uncaughtException', function(exception) {
    const now = new Date();
    var datetime = date.format(now, 'YYYY-MM-DD');
    fs.writeFileSync('./logs/error_log' + datetime + '.txt', exception.toString());
});

// set view engine //
app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(express.static("views"));
// set view engine //

//set body parser//
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(bodyParser.json({ limit: '50mb' }));

// set session
app.use(session({
    secret: 'amndi5c&^*((*HJHJVHBH',
    resave: false,
    saveUninitialized: true
}));
app.use(flash());


const air = require('./libs/air')
const hotel = require('./libs/hotel')


app.use((err, req, res, next) => {
    log.error(err);
    log.error(err.stack);
    throw new Error(err);
    return res.status(err.statusCode || 500).send(err.message);
});

try {
    var routes = require("./routes/routes")
    let hotel_routes = require('./routes/hotel-routes');
    let admin_routes = require('./routes/admin-routes');
    let admin_hotel_routes = require('./routes/admin-hotel-routes');
    app.use('/', routes, hotel_routes);
    app.use('/admin', admin_routes, admin_hotel_routes);
} catch (error) {
    console.log(error);
}

const bigx = []

// define global variables //
global.base_url = hostname
global.Air = air
global.Hotel = hotel
global.db = mysql
global.moment = momentjs
global.bigb = bigx
global.fun = Functions;
// define global variables //
