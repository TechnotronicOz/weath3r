define(function(require, exports, module) {
    'use strict';

    var Backbone = require('backbone');
    var _ = require('underscore');
    var App = require('app');
    var Handlebars = require('handlebars');
    var template = require('text!templates/forecast.hbs');

    module.exports = Backbone.View.extend({

        template: Handlebars.compile(template),

        initialize: function() {
            return this;
        },

        render: function() {
            this.callApi();
            return this;
        },

        callApi: function() {
            var self = this;
            $.ajax({
                url: App.apiRoutes.forecast + self.model.get('state') + '/' + self.model.get('city'),
                dataType: 'json'
            }).done(function(data) {
               self.processApiData(data);
            });
        },

        processApiData: function(data) {
            var updatedData = _.extend({ city: this.model.get('city'), state: this.model.get('state') }, data.forecast.simpleforecast);
            return this.$el.html(this.template(updatedData));
        }
    })
})