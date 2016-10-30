import winston from 'winston';
import request from 'request-promise-native';
import {parseConfig} from '../util';

export const login = function (program) {
	parseConfig();

	if(!config) {
		return;
	}

	// Read the configuration file
	if(program.token) {
		// Prefer use of token over username/password
		request(`${config.autoDeployServer}/api/login/token`, {
			token: program.token
		})

	} else if (program.username && program.password) {
		request(`${config.autoDeployServer}/api/login/password`, {
			username: program.username,
			password: program.password
		})

	} else {
		// TODO: Check the local settings for defaults
		winston.log('error', 'No credentials provided')
	}
};

export default login;