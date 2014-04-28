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
            $('.home').addClass('shorty');
            this.$el.html(this.template());

            if (!this.locationIdQuery) {
                $('#title', this.$el).text('Your Locations');
                $('#snapshots', this.$el).html(new SnapshotView({ collection: this.collection }).render().el);
            } else {
                var locationId = Number(this.locationIdQuery),
                    locationModel = this.collection.findWhere({ locationId: locationId });

                $('#title', this.$el).text('Weather for ' + locationModel.get('city') + ', ' + locationModel.get('state'));
                $('#forecast', this.$el).html(new ForecastView({ model: locationModel }).render().el);
                $('#satellite', this.$el).html(new SatelliteView({ model: locationModel, id: 'satellite' }).render().el);
                $('#forecast', this.$el).html(new ForecastView({ model: locationModel, id: 'forecast' }).render().el);
                $('#details', this.$el).html(new DetailView({ model: locationModel, id: 'details' }).render().el);
            }

            return this;
        }
    });
})