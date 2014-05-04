define(function(require, exports, module) {
    'use strict';

    var $ = require('jquery');

    // Alias the module for easier identification.
    var app = module.exports;

    // The root path to run the application through.
    app.root = '/';
    app.apiRoutes = {
        //getCurrent: 'http://api.openweathermap.org/data/2.5/weather?q='
        current: '/weather/conditions/',
        satellite: '/weather/satellite/',
        forecast: '/weather/forecast/',
        locationModel: '/weather',
        locationCollection: '/locations'
    };

    app.fetchFromApi = function(apiRoute, location, details) {
        $.ajax({
            url: app.apiRoutes.apiRoute + location,
            dataType: 'json'
        }).done(function(data) {
            return data;
        });
    };

    app.errors = {
        invalid: {
            id: 1,
            msg: 'You have entered an invalid weather location'
        }
    };
});