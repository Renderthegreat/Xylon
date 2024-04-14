var commands = { }
import help from './commands/help.js' 
import version from './commands/version.js'
import create from './commands/create.js'
import init from './commands/init.js'

commands = {
	help,
	version,
	create,
	init
}
export default function (command, params) {
	if (command == "importXIon") {
		return commands
	}
	return commands[command](params);
}