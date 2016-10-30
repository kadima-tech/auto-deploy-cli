'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.init = undefined;

var _requestPromiseNative = require('request-promise-native');

var _requestPromiseNative2 = _interopRequireDefault(_requestPromiseNative);

var _winston = require('winston');

var _winston2 = _interopRequireDefault(_winston);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _nodeSsh = require('node-ssh');

var _nodeSsh2 = _interopRequireDefault(_nodeSsh);

var _util = require('../util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var init = exports.init = function init() {
	var home = process.env.HOME || process.env.USERPROFILE;

	_winston2.default.log('info', 'Initializing deployment server...');

	// Read the configuration file
	_winston2.default.log('debug', 'Reading properties', {
		cwd: process.cwd()
	});

	// Get the deployment json
	var config = (0, _util.parseConfig)();

	if (!config) {
		_winston2.default.debug('No configuration available. Init failed.');
		return;
	}

	// Setup the SSH client
	var ssh = new _nodeSsh2.default();

	// Now we need to do a query to the server
	(0, _requestPromiseNative2.default)(config.autoDeployServer + '/api/init').then(function (response) {
		// We now have a public key, so lets use it for all environments
		return Promise.all(config.environments.map(function (environment) {

			// Connect to the remote server
			return ssh.connect({
				host: environment.host,
				username: 'root',
				privateKey: environment.privateKey || home + '/.ssh/id_rsa'
			})

			// Append the SSH key
			.execCommand('echo ' + response.pubkey + '\n >> ~/.ssh/authorized_keys');
		}));
	}).then(function (responses) {
		_winston2.default.log('info', 'Environments initialized');
	});
};

exports.default = init;