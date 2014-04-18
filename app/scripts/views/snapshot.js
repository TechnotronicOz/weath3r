define(function(require, exports, module) {
    'use strict';

    var Backbone = require('backbone');
    var App = require('app');
    var Handlebars = require('handlebars');
    var template = require('text!templates/snapshot.hbs');

    module.exports = Backbone.View.extend({

        template: Handlebars.compile(template),

        initialize: function(options) {
            console.log('snapshot model', this.model);
            console.log('parent', options.parent);
            this.parentEl = options.parent;

            var self = this;
            $.ajax({
                url: App.apiRoutes.current + this.model.get('state') + '/' + this.model.get('city'),
                dataType: 'json'
            }).done(function(data) {
                console.log(data.current_observation);
                self.model.set({
                    curTemp: data.current_observation.temp_f,
                    curIcon: data.current_observation.icon,
                    curIconUrl: data.current_observation.icon_url
                });
                console.log('model', self.model.toJSON());
                self.render();
            });
        },

        render: function() {
            console.log('this.parentel', this.parentEl);
            this.parentEl.append(this.$el.html(this.template(this.model.toJSON())));
            //$('#snapshots').append(this.$el.html(this.template(this.model.toJSON())));
            return this;
        }
    });
});