const port = process.env.PORT || 8080;

var express = require('express');
var mysql = require('mysql');
var Validator = require('express-validator');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var app = express();

//---ROUTING...SECTION---//
var indexRoute = require('./route/index');

//---VIEW...ENGINE---//
app.set('views', path.join(__dirname, 'view'));
app.set('view engine', 'ejs');

//---MIDDLE...WARES---//
app.use('/', indexRoute);

app.listen(port, () => console.log('Listening on port ${port}..'));

module.exports = app;