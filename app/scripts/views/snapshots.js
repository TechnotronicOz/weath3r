define(function(require, exports, module) {
    'use strict';

    var Backbone = require('backbone');
    var App = require('app');
    //var Handlebars = require('handlebars');
    //var template = require('text!templates/snapshots');
    var SnapshotView = require('views/snapshot');

    module.exports = Backbone.View.extend({

        subViews: {},

        //template: Handlebars.compile(template),

        id: 'snapshots',

        initialize: function() {
            console.log('this.id', this.id);
            this.collection.each(function(weatherItm) {
               this.subViews[weatherItm] = new SnapshotView({ model: weatherItm, parent: this.$el });
            }, this);
            return this;
        },

        render: function() {

            return this;
        }
    });
});