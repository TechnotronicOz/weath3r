define(function(require, exports, module) {
    'use strict';

    var Backbone = require('backbone');
    var Handlebars = require('handlebars');
    var App = require('app');
    var template = require('text!templates/location.hbs');

    module.exports = Backbone.View.extend({

        template: Handlebars.compile(template),

        className: 'myLocation',

        events: {
            'click #save': 'save'
        },

        initialize: function() {
            this.listenTo(this.collection, 'change', this.render);
            return this;
        },

        render: function() {
            App.homeview.shrink();
            this.collection.each(function(locationItm) {
                console.log('locationItm', locationItm);
                 this.$el.append('<li><a href="/#/mylocation/edit/' + locationItm.get('_id') + '">' + locationItm.get('city') + ', ' + locationItm.get('state') + '</a></li>');
            }, this);
            return this;
        }
    });
});