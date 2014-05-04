define(function(require, exports, module) {
	'use strict';

	var Backbone = require('backbone');

	module.exports = Backbone.Model.extend({
		defaults: {
			errorId: 0,
			errorMsg: ''
		}
	});
});