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

        processData: function(data) {
            var obj = {
                img: data.satellite.image_url,
                img_vis: data.satellite.image_url_vis
            };
            return this.$el.html(this.template(obj));
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