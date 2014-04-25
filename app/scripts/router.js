define(function(require, exports, module) {
    'use strict';

    // External dependencies.
    var Backbone = require('backbone');
    var App = require('app');

    module.exports = Backbone.Router.extend({
        routes: {
            '': 'index',
            'weather': 'weather',
            'weather/:location': 'weather',
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

        weather: function(location) {
            console.log('location query', location);
            //if (!location) {
                //console.log('!location');
                var WeatherView = require('views/weather');
                this.locationCollection.fetch().then(function () {
                    this.setView(new WeatherView({ collection: this.locationCollection, location: location }));
                }.bind(this));
            /*} else {
                console.log('location');
            }*/
        },

        mylocation: function() {
            var LocationView = require('views/location');
            /* this.locationModel.fetch().then(function() {
                this.setView(new LocationView({ model: this.locationModel }));
            }.bind(this)); */
            this.locationCollection.fetch().then(function() {
                this.setView(new LocationView({ collection: this.locationCollection }));
            }.bind(this));
        },

        setView: function(view) {
            //console.log('setView', view);
            if (this.view) {
                this.view.remove();
                this.view = null;
            }
            this.view = view;
            return this.$appContainer.html(this.view.render().el)
        }
    });
});