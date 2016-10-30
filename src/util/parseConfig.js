import winston from 'winston';

export const parseConfig = function () {
	// Get the deployment json
	try {
		const deployJson = require(`${process.cwd()}/deploy.json`);

		// Verify that the required settings exist

		// Return the deployment json
		return deployJson;

	} catch (e) {
		winston.error('No configuration file found in this project. Are you in the right directory?');

		// Return null as an indication of error
		return null;
	}
}