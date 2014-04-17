define(function(require, exports, module) {
    'use strict';

    var Backbone = require('backbone');
    var locationModel = require('models/location');

    module.exports = Backbone.Collection.extend({
        url: '/locations',
        model: locationModel
    });
});