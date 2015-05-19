//"Visual CV" node server

//Configuration file
var config = require('./config');

//Imports 
var bodyParser = require('body-parser');
var morgan = require('morgan'); //used to see requests
var path = require('path');
var express = require('express');
var favicon = require('serve-favicon');
var stylus = require('stylus');
var methodOverride = require('method-override');

//global variables
var app = express(); //new express node app
var port = config.port; //the port for the app

// APP CONFIGURATION ==================
// ====================================
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(function(req, res, next) { // configure our app to handle CORS requests
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
    next();
});
app.use(favicon(__dirname + '/public/assets/images/favicon.ico'));
app.use(morgan('dev'));
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(require('stylus').middleware(__dirname + '/public')); //In your html files, just include the .styl files, but use the css extension. Express will compile it from styl to css on the fly
app.use(express.static(__dirname + '/public'));
app.use(function(req, res) {
    res.sendfile(__dirname + '/public/app/views/index.html');
});
app.set('port', config.port);
app.set('views', path.join(__dirname, 'app/views'));

app.listen(app.get('port'), function() {
    console.log('Express server for _Visual CV_ listening on port ' + app.get('port'));
});
