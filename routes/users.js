var express = require('express');
var router = express.Router();
var Weather = require('../weather');

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
    userWeather.city = req.body.city;
    userWeather.state = req.body.state;
    userWeather.zipcode = req.body.zipcode;
    res.json(userWeather);
})

function encodeLocale(state, city) {
    return encodeURIComponent(state) + '/' + encodeURIComponent(city);
}

router.get('/:lookupType/:state/:city', function(req, res) {
    var weather = new Weather(apiKey, {}, req.param('lookupType')),
        locale = encodeLocale(req.param('state'),req.param('city')),
        apiResult;

    weather.query(locale).then(function(result) {
        apiResult = result;
    }).fail(function(error) {
        apiResult = error;
    }).done(function() {
        res.json(apiResult);
    });
});

module.exports = router;
