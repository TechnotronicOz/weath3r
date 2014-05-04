define(function(require, exports, module) {
    'use strict';

    var Backbone = require('backbone');
    var App = require('app');
    var Handlebars = require('handlebars');
    var template = require('text!templates/satellite.hbs');

    module.exports = Backbone.View.extend({

        template: Handlebars.compile(template),

        initialize: function() {
            return this;
        },

        events: {
            'click .btn-visible': 'showVisible',
            'click .btn-radar': 'showRadar'
        },

        showVisible: function(e) {
            this.$visible.show();
            this.$radar.hide();
        },

        showRadar: function(e) {
            this.$radar.show();
            this.$visible.hide();
        },

        processData: function(data) {
            var obj = {
                img: data.satellite.image_url,
                img_vis: data.satellite.image_url_vis
            };
            this.$el.html(this.template(obj));

            this.setEls();
        },

        setEls: function() {
            this.$radar = $('.img-radar', this.$el);
            this.$visible = $('.img-visible', this.$el);

            this.$radar.hide();
        },

        render: function() {
            var self = this;
            $.ajax({
                url: App.apiRoutes.satellite + self.model.get('state') + '/' + self.model.get('city'),
                dataType: 'json'
            }).done(function(data) {
                this.processData(data);
            }.bind(this));

            return this;
        }
    });
});