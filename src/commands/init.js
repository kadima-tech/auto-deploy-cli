import request from 'request-promise-native';
import winston from 'winston';
import fs from 'fs';
import sshClient from 'node-ssh';

import {parseConfig} from '../util';

export const init = function () {
	const home = process.env.HOME || process.env.USERPROFILE;

	winston.log('info', 'Initializing deployment server...');

	// Read the configuration file
	winston.log('debug', 'Reading properties', {
		cwd: process.cwd()
	});

	// Get the deployment json
	const config = parseConfig();

	if(!config) {
		winston.debug('No configuration available. Init failed.');
		return;
	}

	// Setup the SSH client
	const ssh = new sshClient();

	// Now we need to do a query to the server
	request(`${config.autoDeployServer}/api/init`)
		.then((response) => {
			// We now have a public key, so lets use it for all environments
			return Promise.all(config.environments.map((environment) => {

				// Connect to the remote server
				return ssh.connect({
					host: environment.host,
					username: 'root',
					privateKey: environment.privateKey || `${home}/.ssh/id_rsa`
				})

				// Append the SSH key
				.execCommand(`echo ${response.pubkey}\n >> ~/.ssh/authorized_keys`)
			}));
		}).then((responses) => {
			winston.log('info', 'Environments initialized');
		});
};

export default init;