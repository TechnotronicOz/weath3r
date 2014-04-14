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
        getCurrent: '/weather/',
        satellite: '/weather/satellite/'
    }
});