define(function(require, exports, module) {
    'use strict';

    var Backbone = require('backbone');
    var Handlebars = require('handlebars');
    var template = require('text!templates/location.hbs');

    module.exports = Backbone.View.extend({

        template: Handlebars.compile(template),

        className: 'myLocation',

        events: {
            'click #save': 'save'
        },

        initialize: function() {
            console.log('this.collection', this.collection);
            this.listenTo(this.collection, 'change', this.render);
            return this;
        },

        render: function() {
            this.collection.each(function(locationItm) {
                 this.$el.append('<li><a href="/#/mylocation/edit/' + locationItm.get('locationId') + '">' + locationItm.get('city') + ', ' + locationItm.get('state') + '</a></li>');
            }, this);
            return this;
        }
    });
});