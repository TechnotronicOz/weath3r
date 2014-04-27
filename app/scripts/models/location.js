define(function(require, exports, module) {
   'use strict';

    var Backbone = require('backbone');
    var App = require('app');

    module.exports = Backbone.Model.extend({

        //url: App.apiRoutes.locationModel,
        url: App.apiRoutes.locationCollection,

        defaults: {
            userId: null,
            city: null,
            state: null,
            zipcode: null
        },

        validate: function(attrs, options) {
            if (!attrs.city) {
                return 'You must enter a city';
            }

            if (!attrs.state) {
                return 'You must enter a state';
            }
        },

        parse: function(response, options) {
            return response;
        }
    })
});