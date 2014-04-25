define(function(require, exports, module) {
    'use strict';

    var Backbone = require('backbone');
    var App = require('app');
    var Handlebars = require('handlebars');
    var template = require('text!templates/weather.hbs');
    var templateDetails = require('text!templates/weather-details.hbs');
    var SatelliteView = require('views/satellite');
    var ForecastView = require('views/forecast');
    var SnapshotView = require('views/snapshots');

    module.exports = Backbone.View.extend({

        template: Handlebars.compile(template),
        templateDetails: Handlebars.compile(templateDetails),

        className: 'row',

        initialize: function(options) {
            this.locationIdQuery = options.location;
            return this;
        },

        render: function() {
            //this.grabWeather();
            this.$el.html(this.template());

            if (!this.locationIdQuery) {
                var snapshotView = new SnapshotView({ collection: this.collection });
                $('#snapshots', this.$el).html(snapshotView.el);
            } else {
                var locationId = Number(this.locationIdQuery),
                    locationModel = this.collection.findWhere({ locationId: locationId });
                $('#forecast', this.$el).html(new ForecastView({ model: locationModel }).render().el);
            }

            //var snapshotView = new SnapshotView({ collection: this.collection });
            //$('#snapshots', this.$el).html(snapshotView.el);

            // create satellite view
            //var satelliteView = new SatelliteView({ model: this.model, id: 'satellite' });
            //$('#satellite', this.$el).html(satelliteView.render().el);

            //var forecastView = new ForecastView({ model: this.model, id: 'forecast' });
            //$('#forecast', this.$el).html(forecastView.render().el);

            //this.subView(null, ForecastView, { model: this.model, id: 'forecast' });

            return this;
        }
    });
})