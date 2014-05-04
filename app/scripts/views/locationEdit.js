define(function(require, exports, module) {
    'use strict';

    var Backbone = require('backbone');
    var _ = require('underscore');
    var Handlebars = require('handlebars');
    var App = require('app');
    var template = require('text!templates/locationEdit.hbs');

    module.exports = Backbone.View.extend({

        template: Handlebars.compile(template),

        events: {
            'click #save': 'save',
            'click #delete': 'remove'
        },

        initialize: function() {
            this.listenTo(this.model, 'change', this.render);
            return this;
        },

        render: function() {
            console.log(this.model);
            var messages;
            App.homeview.shrink();
            if (this.$el.find('#messages').html() !== '') {
                var messages = this.$el.find('#messages').html()
            }
            this.$el.html(this.template(this.model.toJSON()));
            this.$el.find('#messages').html(messages);
            return this;
        },

        save: function() {
            var self = this;
            this.model.set({
                city: this.$el.find('#city').val(),
                state: this.$el.find('#state').val()
            });

            if (this.model.isValid()) {
                this.model.save();
                $('#messages', this.$el).html('<div class="panel palette-emerald"><div class="panel-heading">Saved</div></div>')
            } else {
                $('#messages', this.$el).html('<div class="panel palette-alizarin"><div class="panel-heading"><strong>Error:</strong> ' + this.model.validationError + '</div></div>');
            }
            _.delay(function() {
                self.$el.find('#messages').empty();
            }, 5000);
            return false;
        },

        remove: function() {
            this.collection.remove(this.model);
            this.model.destroy();
            this.collection.trigger('change');
            App.router.navigate('weather', { trigger: true });
        }
    });
});