define(function(require, exports, module) {
    'use strict';

    // External dependencies.
    var Backbone = require('backbone');
    var App = require('app');

    // Defining the application router.
    module.exports = Backbone.Router.extend({
        routes: {
            '': 'index',
            'weather': 'weather',
            'mylocation': 'mylocation'
        },

        initialize: function() {
            this.$appContainer = $('#main');
            this.loadUserData();
        },

        index: function() {
            console.log('Welcome to your / route.');
        },

        loadUserData: function() {
            var LocationModel = require('models/location');
            var LocationCollection = require('collections/locations');
            this.locationCollection = new LocationCollection();
            this.locationModel = new LocationModel();
        },

        weather: function() {
            var WeatherView = require('views/weather');
            var self = this;
            this.locationCollection.fetch().then(function() {
                console.log('collection fetched');
                console.log('...', this.locationCollection);
                this.setView(new WeatherView({ collection: this.locationCollection }));
            }.bind(this));
            /* this.locationModel.fetch().then(function() {
                this.setView(new WeatherView({ model: this.locationModel }));
            }.bind(this)); */
        },

        mylocation: function() {
            var LocationView = require('views/location');
            this.locationModel.fetch().then(function() {
                this.setView(new LocationView({ model: this.locationModel }));
            }.bind(this))
        },

        setView: function(view) {
            console.log('setView', view);
            if (this.view) {
                this.view.remove();
                this.view = null;
            }
            this.view = view;
            return this.$appContainer.html(this.view.render().el)
        }
    });
});