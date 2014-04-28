var express = require('express');
var router = express.Router();
var Weather = require('../weather');

var redis = require('redis');
var client = redis.createClient();

var q = require('q');

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


    client.hgetall(cacheKey, function(err, reply) {
        if (err) {
            console.log('cache err', err);
        } else {
            var timeDiff = 0;
            if (reply) {
                timeDiff = Math.round((Date.now() - reply.timestamp) / 1000);
                console.log('... timediff', timeDiff);
                // 600 sec = 10 min
                if (timeDiff < 6000 && reply.locale == locale && reply.lookupType === lookupType) {
                    console.log('in cache: ' + locale + ', ' + lookupType);
                    apiResult = JSON.parse(reply.data);
                    res.json(apiResult);
                    return false;
                } else {
                    callFromAPI();
                }
            } else {
                callFromAPI();
            }
        }
    });

    function callFromAPI() {
        console.log('calling api: ' + locale + ', ' + lookupType);
        var weather = new Weather(apiKey, {}, lookupType);
        weather.query(locale).then(function(result) {

            // store in cache
            client.hmset(cacheKey, {
                timestamp: Date.now(),
                locale: locale,
                lookupType: lookupType,
                data: JSON.stringify(result)
            });
            //client.expire(cacheKey, 6000);

            apiResult = result;
            res.json(apiResult);
        });
    }
});

module.exports = router;
