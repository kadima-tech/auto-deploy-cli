'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.login = undefined;

var _winston = require('winston');

var _winston2 = _interopRequireDefault(_winston);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var login = exports.login = function login(program) {
	// Read the configuration file
	if (program.token) {
		// Prefer use of token over username/password
	} else if (program.username && program.password) {} else {
		// TODO: Check the local settings for defaults
		_winston2.default.log('error', 'No credentials provided');
	}
};

exports.default = login;