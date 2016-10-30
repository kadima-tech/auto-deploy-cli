import program from 'commander';

import pjson from '../package.json';
import {login, init, deploy} from '../lib/commands';

// Parse the arguments
const version = pjson.version;
const author  = pjson.author;
const description = pjson.description;

// Setup the program
program
	.version(version)

program
	.command('login')
	.description('Logs in to the auto-deploy-server')
	.option('-u --username <username>', 'Username on auto-deploy-server')
	.option('-p --password <password>', 'Password on auto-deploy-server')
	.option('-t --token <token>', 'API Token on auto-deploy-server')
	.action(login);

program
	.command('init')
	.description('Initialises the target server(s) for automated deployment')
	.action(init);

program
	.command('deploy [env]')
	.description('Deploys the project to the remote server for the given environment')
	.action(deploy);

program.parse(process.argv);