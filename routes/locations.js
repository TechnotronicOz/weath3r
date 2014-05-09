var express = require('express');
var router = express.Router();
var _ = require('underscore');

// db-related stuff
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/weath3r');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
  console.log('connected to mongo...');
});

// Our weather model schema
var Schema = new mongoose.Schema({
    id: Number,
    userId: Number,
    locationId: Number,
    city: String,
    state: String,
    zipcode: Number,
    time: { type: Date, default: Date.now },
    active: Boolean
});

// Our weather model from the schema
var WeatherModel = mongoose.model('Weather', Schema);

// Get all weather models
router.get('/', function(req, res) {
    WeatherModel.find(function(err, models) {
        if (err) {
            return console.log('Error', err);
        }
        return res.send(models);

    });
});

// Create new weather model
router.post('/', function(req, res) {
    console.log('Creating new Weather Model');
    var model = new WeatherModel({
        city: req.body.city,
        state: req.body.state
    });

    return model.save(function(err) {
        if (err) {
            console.log('Error', err);
        }
        return res.send(model);
    });
});

// Update weather model
router.put('/:id', function(req, res) {
    console.log('Updating location ' + req.body.city);
    return WeatherModel.findById(req.params.id, function(err, model) {
        model.city = req.body.city;
        model.state = req.body.state;
        model.time = Date.now()

        return model.save(function(err) {
            if (err) {
                return console.log('Save error ' + err);
            }
            return res.send(model);
        });
    });
});

//Delete weather model
router.delete('/:id', function(req, res) {
    console.log('Deleting weather entry: ' + req.params.id);
    return WeatherModel.findById(req.params.id, function(err, model) {

        if (model == null) {
            return res.send('');
        }

        return model.remove(function(err) {
            if (!err) {
                return res.send('');
            } else {
                return console.log('error', err);
            }
        });
    });
});

module.exports = router;
