var express = require('express');
var router = express.Router();

var userWeather = [
    {
        userId: 1,
        locationId: 1,
        city: 'Kansas City',
        state: 'MO',
        zipcode: '64151'
    },
    {
        userId: 1,
        locationId: 2,
        city: 'Fort Myers',
        state: 'FL',
        zipcode: '33912'
    },
    {
        userId: 1,
        locationId: 3,
        city: 'Key West',
        state: 'FL',
        zipcode: '33010'
    },
    {
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
    //userWeather.city = req.body.city;
    //userWeather.state = req.body.state;
    //userWeather.zipcode = req.body.zipcode;

    console.log('post received', req.body.locationId);
    userWeather.forEach(function(item) {
        console.log('item', item.locationId);
        if (item.locationId === req.body.locationId) {
            console.log('updating item: ', item);
            item.city = req.body.city;
            item.state = req.body.state;
        }
    })

    res.json(userWeather);
})

module.exports = router;
