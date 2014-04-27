define(function(require, exports, module) {
    'use strict';

    var Backbone = require('backbone');
    var Handlebars = require('handlebars');
    var template = require('text!templates/weather.hbs');
    var SatelliteView = require('views/satellite');
    var ForecastView = require('views/forecast');
    var SnapshotView = require('views/snapshots');
    var DetailView = require('views/weatherDetais');

    module.exports = Backbone.View.extend({

        template: Handlebars.compile(template),

        className: 'row',

        initialize: function(options) {
            this.locationIdQuery = options.location;
            return this;
        },

        render: function() {
            this.$el.html(this.template());

            if (!this.locationIdQuery) {
                var snapshotView = new SnapshotView({ collection: this.collection });
                $('#snapshots', this.$el).html(snapshotView.el);
            } else {
                var locationId = Number(this.locationIdQuery),
                    locationModel = this.collection.findWhere({ locationId: locationId });
                $('#forecast', this.$el).html(new ForecastView({ model: locationModel }).render().el);

                var satelliteView = new SatelliteView({ model: locationModel, id: 'satellite' });
                $('#satellite', this.$el).html(satelliteView.render().el);

                var forecastView = new ForecastView({ model: locationModel, id: 'forecast' });
                $('#forecast', this.$el).html(forecastView.render().el);

                var detailView = new DetailView({ model: locationModel, id: 'details' });
                $('#details', this.$el).html(detailView.render().el);
            }

            return this;
        }
    });
})