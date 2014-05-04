define(function(require, exports, module) {
    'use strict';

    var Backbone = require('backbone');
    var Handlebars = require('handlebars');
    var App = require('app');
    var template = require('text!templates/weather.hbs');
    var SatelliteView = require('views/satellite');
    var ForecastView = require('views/forecast');
    var SnapshotView = require('views/snapshots');
    var DetailView = require('views/weatherDetais');
    var ErrorView = require('views/error');

    module.exports = Backbone.View.extend({

        template: Handlebars.compile(template),

        className: 'row',

        initialize: function(options) {
            this.locationIdQuery = options.location;
            return this;
        },

        render: function() {
            App.homeview.shrink();
            this.$el.html(this.template());

            if (!this.locationIdQuery) {
                $('#title', this.$el).text('Your Locations');
                $('#snapshots', this.$el).html(new SnapshotView({ collection: this.collection }).render().el);
            } else {
                var locationId = this.locationIdQuery,
                    locationModel = this.collection.findWhere({ _id: locationId });

                if (!locationModel || typeof locationModel === 'undefined') {
                    this.$el.html(new ErrorView({ errorId: App.errors.invalid.id, errorMsg: App.errors.invalid.msg }).render().el);
                } else {
                    $('#title', this.$el).text('Weather for ' + locationModel.get('city') + ', ' + locationModel.get('state'));
                    $('#forecast', this.$el).html(new ForecastView({ model: locationModel }).render().el);
                    $('#satellite', this.$el).html(new SatelliteView({ model: locationModel, id: 'satellite' }).render().el);
                    $('#forecast', this.$el).html(new ForecastView({ model: locationModel, id: 'forecast' }).render().el);
                    $('#details', this.$el).html(new DetailView({ model: locationModel, id: 'details' }).render().el);
                }
            }

            return this;
        }
    });
})