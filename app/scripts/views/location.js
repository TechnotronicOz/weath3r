define(function(require, exports, module) {
    'use strict';

    var Backbone = require('backbone');
    var Handlebars = require('handlebars');
    var template = require('text!templates/location.hbs');

    module.exports = Backbone.View.extend({
        template: Handlebars.compile(template),
        //tagName: 'div',
        //id: '',
        className: 'myLocation',
        events: {
            'click #save': 'save'
        },
        initialize: function() {
            console.log('this.collection', this.collection);
            //this.listenTo(this.collection, 'change', this.render);
            return this;
        },
        render: function() {
            //this.$el.html(this.template(this.model.toJSON()));
            this.collection.each(function(locationItm) {
                 this.$el.append('<li>' + locationItm.get('city') + ', ' + locationItm.get('state') + '</li>');
            }, this);
            return this;
        },
        save: function(event) {

            /* console.log('we should be saving', event);

            this.model.set({
                city: this.$el.find('#city').val(),
                state: this.$el.find('#state').val(),
                zipcode: this.$el.find('#zipcode').val()
            });
            if (this.model.isValid()) {
                this.model.save();
                $('#messages', this.$el).html('<div class="panel panel-success"><div class="panel-heading">Saved</div></div>')
            } else {
                $('#messages', this.$el).html('<div class="panel panel-danger"><div class="panel-heading"><strong>Error:</strong> ' + this.model.validationError + '</div></div>');
            }
            return false; */
        }
    });
});