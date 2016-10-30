'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.parseConfig = undefined;

var _winston = require('winston');

var _winston2 = _interopRequireDefault(_winston);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var parseConfig = exports.parseConfig = function parseConfig() {
	// Get the deployment json
	try {
		var deployJson = require(process.cwd() + '/deploy.json');

		// Verify that the required settings exist

		// Return the deployment json
		return deployJson;
	} catch (e) {
		_winston2.default.error('No configuration file found in this project. Are you in the right directory?');

		// Return null as an indication of error
		return null;
	}
};