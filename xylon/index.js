import run from "./command.js";
import colors from "./colors.js";

const args = process.argv.slice(2);
const command = args[0];
const params = args.slice(1);
console.log("[" + colors.green + "xylon" + colors.white + "]");

const commands = run("importXIon");
async function Main() {
	let result = -1;
	if (!command) {
		console.log(
			colors.red +
				"CommandError: " +
				colors.orange +
				"No command specified!\nUse " +
				colors.cyan +
				'"help" ' +
				colors.orange +
				"to see all commands.",
		);
	} else if (!commands[command]) {
		console.log(
			colors.red +
				"CommandError: " +
				"Command: " +
				colors.yellow +
				command +
				colors.orange +
				" not found!\nUse " +
				colors.cyan +
				'"help" ' +
				colors.orange +
				"to see all commands.",
		);
	} else {
		result = await run(command, params);
	}
	console.log(colors.reset + "\n");
	switch (result) {
		case 0: {
			console.log(
				colors.green +
					"Command executed successfully!\n" +
					colors.orange +
					"Exited with code: " +
					colors.cyan +
					result,
			);
			break;
		}
		case -1: {
			console.log(
				colors.red +
					"Command failed!\n" +
					colors.orange +
					"Exited with code: " +
					colors.cyan +
					result,
			);
			break;
		}
	}
}
Main();
