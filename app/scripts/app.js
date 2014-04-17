define(function(require, exports, module) {
    'use strict';

    /*var _ = require('underscore');
    var $ = require('jquery');
    var Backbone = require('backbone');*/

    // Alias the module for easier identification.
    var app = module.exports;

    // The root path to run the application through.
    app.root = '/';
    app.apiRoutes = {
        //getCurrent: 'http://api.openweathermap.org/data/2.5/weather?q='
        current: '/weather/conditions/',
        satellite: '/weather/satellite/',
        forecast: '/weather/forecast/'
    };

    app.fetchFromApi = function(apiRoute, location, details) {
        $.ajax({
            url: app.apiRoutes.apiRoutet + location,
            dataType: 'json'
        }).done(function(data) {
            return data;
        });
    }
});