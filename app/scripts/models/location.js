define(function(require, exports, module) {
   'use strict';

    var Backbone = require('backbone');
    var App = require('app');

    module.exports = Backbone.Model.extend({

        idAttribute: '_id',

        urlRoot: App.apiRoutes.locationCollection,

        defaults: {
            //id: null,
            userId: null,
            city: null,
            state: null,
            zipcode: null
        },

        initialize: function() {
            //console.log(this);
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