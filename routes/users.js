var express = require('express');
var router = express.Router();
var Weather = require('../weather');

//client.on('error', function(err) {
//    console.log('Redis Client Error:', err);
//});

var apiKey = 'aa3a3b0b486abd2f';

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
