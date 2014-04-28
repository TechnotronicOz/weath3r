var express = require('express');
var router = express.Router();
var _ = require('underscore');

var userWeather = [
    {
        id: 0,
        userId: 1,
        locationId: 1,
        city: 'Kansas City',
        state: 'MO',
        zipcode: '64151'
    },
    {
        id: 1,
        userId: 1,
        locationId: 2,
        city: 'Fort Myers',
        state: 'FL',
        zipcode: '33912'
    },
    {
        id: 2,
        userId: 1,
        locationId: 3,
        city: 'Key West',
        state: 'FL',
        zipcode: '33010'
    },
    {
        id: 3,
        userId: 1,
        locationId: 4,
        city: 'Seattle',
        state: 'WA',
        zipcode: 97951
    }
]

router.get('/', function(req, res) {
    res.json(userWeather);
});

router.post('/', function(req, res) {
    if (req.body.id === null) {
        var newId = userWeather.length + 1;
        userWeather.push({
            id: newId,
            userId: 1,
            locationId: newId,
            city: req.body.city,
            state: req.body.state
        });
        res.json(userWeather[newId - 1]);
    } else {
        userWeather.forEach(function(item) {
            if (item.locationId === req.body.locationId) {
                item.city = req.body.city;
                item.state = req.body.state;
            }
        });
        res.json(userWeather);
    }
});

router.delete('/:location', function(req, res) {
    var locationId = req.param('location');

    _.each(userWeather, function(item, index) {
        if (item.id == locationId) {
            userWeather.splice(index, 1);
        }
    });

    res.send(200);
});

module.exports = router;
