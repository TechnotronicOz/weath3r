define(function(require, exports, module) {
    'use strict';

    var Backbone = require('backbone');
    var locationModel = require('models/location');
    var App = require('app');

    module.exports = Backbone.Collection.extend({
        url: App.apiRoutes.locationCollection,
        model: locationModel
    });
});