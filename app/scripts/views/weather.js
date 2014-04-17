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

        initialize: function() {
            return this;
        },

        /*formulateApiCall: function() {
            var str = this.model.get('state') + '/' + encodeURIComponent(this.model.get('city'));
            return str;
        },

        grabWeather: function() {
            $.ajax({
                url: App.apiRoutes.current + this.formulateApiCall(),
                dataType: 'json'
            }).done(function(data) {
                console.log(data);
                this.processWeather(data);
            }.bind(this));
        },*/

        render: function() {
            //this.grabWeather();
            this.$el.html(this.template());

            var snapshotView = new SnapshotView({ collection: this.collection });

            // create satellite view
            //var satelliteView = new SatelliteView({ model: this.model, id: 'satellite' });
            //$('#satellite', this.$el).html(satelliteView.render().el);

            //var forecastView = new ForecastView({ model: this.model, id: 'forecast' });
            //$('#forecast', this.$el).html(forecastView.render().el);

            //this.subView(null, ForecastView, { model: this.model, id: 'forecast' });

            return this;
        },

        subView: function(viewName, view, args) {
            $('#' + args.id, this.$el).html(new view(args).render().el);
        },

        processWeather: function(weather) {
            var ret = weather.current_observation;
            var weatherObj = {
                conditions: ret.weather,
                temp: ret.temp_f,
                humidity: ret.relative_humidity,
                wind: ret.wind_string,
                precip: ret.precip_today_string,
                icon: ret.icon,
                iconUrl: ret.icon_url,

            }
            $('#details', this.$el).html(this.templateDetails(weatherObj));
        }
    });
})