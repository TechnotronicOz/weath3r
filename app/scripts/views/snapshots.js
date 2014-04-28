define(function(require, exports, module) {
    'use strict';

    var Backbone = require('backbone');
    //var App = require('app');
    //var Handlebars = require('handlebars');
    //var template = require('text!templates/snapshots');
    var SnapshotView = require('views/snapshot');

    module.exports = Backbone.View.extend({

        subViews: {},

        //template: Handlebars.compile(template),

        id: 'snapshots',

        initialize: function() {
            this.collection.each(function(weatherItm) {
               this.subViews[weatherItm] = new SnapshotView({ model: weatherItm, parent: this.$el });
            }, this);
            return this;
        },

        remove: function() {
            this.subViews.forEach(function(view) {
                view.remove();
            });
        },

        render: function() {
            return this;
        }
    });
});