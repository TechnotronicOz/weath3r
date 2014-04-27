define(function(require, exports, module) {
    'use strict';

    var Backbone = require('backbone');
    var Handlebars = require('handlebars');
    var App = require('app');
    var template = require('text!templates/header.hbs');
    require('bootstrap');

    module.exports = Backbone.View.extend({

        template: Handlebars.compile(template),

        initialize: function() {
            var modifiedCollection = [];
            this.collection.each(function(model) {
                modifiedCollection.push({
                    url: '/#/weather/' + model.get('locationId'),
                    city: model.get('city'),
                    state: model.get('state'),
                    model: model
                })
            });

            this.$el.html(this.template({ locations: modifiedCollection }));
        }
    });
});