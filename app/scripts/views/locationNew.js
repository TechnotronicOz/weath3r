define(function(require, exports, module) {
    'use strict';

    var Backbone = require('backbone');
    var _ = require('underscore');
    var Handlebars = require('handlebars');
    var template = require('text!templates/locationEdit.hbs');
    var App = require('app');

    module.exports = Backbone.View.extend({

        template: Handlebars.compile(template),

        events: {
            'click #save': 'save'
        },

        initialize: function() {
            return this;
        },

        render: function() {
            App.homeview.shrink();
            this.$el.html(this.template());
            this.$el.find('h1').text('Add New Location');
            $('#delete', this.$el).hide();
            return this;
        },

        save: function() {
            var city = this.$el.find('#city').val(),
                state = this.$el.find('#state').val(),
                location = {
                    city: city,
                    state: state
                };

            if (this.collection.where(location).length > 0) {
                return this.error('Duplicate entry');
            }

            this.collection.create(location);
            App.router.navigate('weather', { trigger: true });

            App.router.navigate('weather', { trigger: true });

            return false;
        },

        error: function(error) {
            $('#messages', this.$el).html('<div class="panel palette-alizarin"><div class="panel-heading">' + error + '</div></div>');
        }
    });
});