/**
 * Load npm modules and Models
 *
 * @type {createApplication}
 */
var express = require('express'),
    app = express(),
    parseUrl = require('body-parser'),
    mongoose = require('mongoose'),
    Staffs = require('./src/models/StaffsModel');

/**
 * Load configuration file
 */
var cnf = require('./configs/app.json');

/**
 * use parse url
 */
app.use(parseUrl.urlencoded({extended: true}));
app.use(parseUrl.json());
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', cnf.cross_origin);
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    // Pass to next layer of middleware
    next();
});

// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect(cnf.database.mongo);
var routes = require('./configs/routes'); //importing route
routes(app); //register the route

/**
 * Run server
 * run in url listen  specified port
 */
app.listen(cnf.server.port);
console.log('Start Server listen port: ' + cnf.server.port)