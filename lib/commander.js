'use strict';

var _commander = require('commander');

var _commander2 = _interopRequireDefault(_commander);

var _package = require('../package.json');

var _package2 = _interopRequireDefault(_package);

var _commands = require('../lib/commands');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Parse the arguments
var version = _package2.default.version;
var author = _package2.default.author;
var description = _package2.default.description;

// Setup the program
_commander2.default.version(version);

_commander2.default.command('login').description('Logs in to the auto-deploy-server').option('-u --username <username>', 'Username on auto-deploy-server').option('-p --password <password>', 'Password on auto-deploy-server').option('-t --token <token>', 'API Token on auto-deploy-server').action(_commands.login);

_commander2.default.command('init').description('Initialises the target server(s) for automated deployment').action(_commands.init);

_commander2.default.command('deploy [env]').description('Deploys the project to the remote server for the given environment').action(_commands.deploy);

_commander2.default.parse(process.argv);