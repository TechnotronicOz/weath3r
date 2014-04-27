define(function(require, exports, module) {
    'use strict';

    // External dependencies.
    var Backbone = require('backbone');
    var Header = require('views/header');

    module.exports = Backbone.Router.extend({
        routes: {
            '': 'index',
            'weather': 'weather',
            'weather/:location': 'weather',
            'mylocation': 'mylocation',
            'mylocation/edit/:location': 'editLocation'
        },

        initialize: function() {
            this.$appContainer = $('#main');
            var LocationModel = require('models/location');
            var LocationCollection = require('collections/locations');
            this.locationCollection = new LocationCollection();
            this.locationModel = new LocationModel();
            this.loadHeader();
        },

        loadHeader: function() {
            var self = this;
            this.locationCollection.fetch().then(function() {
                self.$header = new Header({ collection: self.locationCollection });
                $('header').html(self.$header.render().el);
            });
        },

        index: function() {
            console.log('Welcome to your / route.');
        },

        weather: function(location) {
            var WeatherView = require('views/weather');
            this.locationCollection.fetch().then(function () {
                this.setView(new WeatherView({ collection: this.locationCollection, location: location }));
            }.bind(this));
        },

        mylocation: function() {
            var LocationView = require('views/location');
            this.locationCollection.fetch().then(function() {
                this.setView(new LocationView({ collection: this.locationCollection }));
            }.bind(this));
        },

        editLocation: function(locationId) {
            var EditLocationView = require('views/locationEdit');
            this.locationCollection.fetch().then(function() {
                var locId = Number(locationId);
                var model = this.locationCollection.findWhere({ locationId: locId });
                this.setView(new EditLocationView({ model: model }));
            }.bind(this));
            window.locationCollection = this.locationCollection;
        },

        setView: function(view) {
            if (this.view) {
                this.view.remove();
                this.view = null;
            }
            this.view = view;
            return this.$appContainer.html(this.view.render().el)
        }
    });
});