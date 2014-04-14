define(function(require, exports, module) {
   'use strict';

    var Backbone = require('backbone');

    module.exports = Backbone.Model.extend({
        url: '/weather',
        defaults: {
            userId: null,
            city: null,
            state: null,
            zipcode: null
        },
        initialize: function() {
            console.log('model.initialize');
        },
        validate: function(attrs, options) {
            console.log('attrs', attrs);
            console.log('options', options);
            if (!attrs.city) {
                return 'You must enter a city';
            }

            if (!attrs.state) {
                return 'You must enter a state';
            }

            if (!attrs.zipcode) {
                return 'you must enter a zipcode';
            }
        },
        parse: function(response, options) {
            console.log()
            return response;
        }
    })
});