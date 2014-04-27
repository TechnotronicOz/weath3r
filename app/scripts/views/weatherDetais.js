define(function(require, exports, module) {
    'use strict';

    var Backbone = require('backbone');
    var Handlebars = require('handlebars');
    var App = require('app');
    var template = require('text!templates/weather-details.hbs');

    module.exports = Backbone.View.extend({

        template: Handlebars.compile(template),

        initialize: function() {
            this.weatherModel = new Backbone.Model();
            return this;
        },

        render: function() {
            this.callApi();
            return this;
        },

        callApi: function() {
            var self = this;
            $.ajax({
                url: App.apiRoutes.current + this.model.get('state') + '/' + this.model.get('city'),
                dataType: 'json'
            }).done(function(data) {
                self.processApi(data.current_observation);
            })
        },

        processApi: function(data) {
            var self = this;
            _.each(data, function(val, key) {
                self.weatherModel.set(key, val);
            });

            this.$el.html(this.template(_.extend({ id: this.model.get('locationId') }, this.weatherModel.toJSON())));
        }
    })
})