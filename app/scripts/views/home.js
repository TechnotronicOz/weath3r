define(function(require, exports, module) {
    'use strict';

    var Backbone = require('backbone');
    var Handlebars = require('handlebars');
    var template = require('text!templates/home.hbs');

    module.exports = Backbone.View.extend({

        id: 'home',

        template: Handlebars.compile(template),

        render: function() {
            this.$el.html(this.template());
            return this;
        },

        shrink: function() {
            this.$el.find('.home').addClass('shorty');
            return this;
        },

        grow: function() {
            this.$el.find('.home').removeClass('shorty');
            return this;
        }
    })
})