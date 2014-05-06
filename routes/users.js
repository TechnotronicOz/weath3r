var express = require('express');
var router = express.Router();
var Weather = require('../weather');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/weath3r');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
  console.log('connected');
});

var Schema = mongoose.Schema;

var UserSchema = new mongoose.Schema({
    username:  { type: String, default: '' },
    firstname: { type: String, default: '' },
    email: { type: String, default: '' },
    password: { type: String, default: '' },
    lastActive: { type: Date, default: Date.now }
});

var weatherSchema = new Schema({
    userId: Number,
    
  title:  String,
  author: String,
  body:   String,
  comments: [{ body: String, date: Date }],
  date: { type: Date, default: Date.now },
  hidden: Boolean,
  meta: {
    votes: Number,
    favs:  Number
  }
});


//client.on('error', function(err) {
//    console.log('Redis Client Error:', err);
//});

var apiKey = 'aa3a3b0b486abd2f';

var user

var userWeather = {
    userId: 1,
    city: 'Kansas City',
    state: 'MO',
    zipcode: '64151'
}

router.get('/', function(req, res) {
    res.json(userWeather);
});

router.post('/', function(req, res) {
    console.log('post');
    userWeather.city = req.body.city;
    userWeather.state = req.body.state;
    userWeather.zipcode = req.body.zipcode;
    res.json(userWeather);
});

function encodeLocale(state, city) {
    return encodeURIComponent(state) + '/' + encodeURIComponent(city);
}

function encodeForCache(location, lookup) {
    return location + '-' + lookup;
}

router.get('/:lookupType/:state/:city', function(req, res) {
    console.log('lookuptype from users.js');

    //console.log('get: ' + req.param('lookupType') + ' / ' + req.param('city') + ', ' + req.param('state'));

    var lookupType = req.param('lookupType'),
        locale = encodeLocale(req.param('state'), req.param('city')),
        cacheKey = encodeForCache(locale, lookupType),
        apiResult;

    var weather = new Weather(apiKey, {}, lookupType);
    weather.query(locale).then(function(result) {
        apiResult = result;
        res.json(apiResult);
    });
});

module.exports = router;
