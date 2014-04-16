var express = require('express');
var router = express.Router();
var Wundernode = require('wundernode');

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

var wunder = new Wundernode(apiKey, true, 10, 'minute');

router.get('/:state/:city', function(req, res) {
    var localeStr = req.param('state') + '/' + encodeURIComponent(req.param('city'));
    wunder.conditions(localeStr, function(err, obj) {
        if (err) {
            console.log('error:', err);
            res.end('Error processing query string:' + localeStr)
        }
        res.end(obj);
    });
});

router.get('/satellite/:state/:city', function(req, res) {
    var locale = req.param('state') + '/' + encodeURIComponent(req.param('city'));
    wunder.satellite(locale, function(err, obj) {
        if (err) {
            console.log('error:', err);
            res.end('Error processing query string:' + locale);
        }
        res.end(obj);
    })
});

module.exports = router;
