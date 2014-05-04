define(function(require, exports, module) {
	'use strict';

	var Backbone = require('backbone');
	var Handlebars = require('handlebars');
	var App = require('app');
	var ErrorModel = require('models/error');
	var template = require('text!templates/error.hbs');

	module.exports = Backbone.View.extend({

		template: Handlebars.compile(template),

		initialize: function(opts) {
			console.log('opts', opts);
			this.model = new ErrorModel();
			this.model.set({
				errorId: opts.errorId,
				errorMsg: opts.errorMsg
			});
			return this;
		},

		render: function() {
			this.$el.html(this.template(this.model.toJSON()));
			return this;
		}

	});
});