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
            this.listenTo(this.collection, 'change', this.render, this);
            return this;
        },

        render: function() {
            var arr = [];
            this.collection.each(function(model) {
                arr.push({
                    url: '/#/weather/' + model.get('locationId'),
                    city: model.get('city'),
                    state: model.get('state')
                });
            })
            this.$el.html(this.template({ locations: arr }));
            return this;
        }
    });
});