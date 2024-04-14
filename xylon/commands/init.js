import fs from "fs";
import { cwd } from "process";
import colors from "../colors.js";
import { Start } from "../host.js";

export default async function (params) {
	let Path = cwd() + "/";
	let Port = 80;
	if (params.indexOf("--path") != -1) {
		if(typeof params[params.indexOf("--path") + 1] == 'undefined'){
			console.log(colors.red + "CommandError: " + colors.orange + "Got " + colors.cyan + "--path " + colors.orange + "but no path was specified!" + colors.reset)
		}
		Path += params[params.indexOf("--path") + 1];
	}
	if (params.indexOf("-p") != -1) {
		if(typeof params[params.indexOf("-p") + 1] == 'undefined'){
			console.log(colors.red + "CommandError: " + colors.orange + "Got " + colors.cyan + "-p " + colors.orange + "but no path was specified!" + colors.reset)
			return -1
		}
		Path += params[params.indexOf("-p") + 1];
	}
	if (params.indexOf("--port") != -1) {
		if(typeof params[params.indexOf("--port") + 1] == 'undefined'){
			console.log(colors.red + "CommandError: " + colors.orange + "Got " + colors.cyan + "--port " + colors.orange + "but no port was specified!" + colors.reset)
		}
		Port = params[params.indexOf("--port") + 1];
	}
	if (params.indexOf("-o") != -1) {
		if(typeof params[params.indexOf("-o") + 1] == 'undefined'){
			console.log(colors.red + "CommandError: " + colors.orange + "Got " + colors.cyan + "-o " + colors.orange + "but no port was specified!" + colors.reset)
			return -1
		}
		Port += params[params.indexOf("-o") + 1];
	}
	if (!fs.existsSync(Path)) {
		console.log(colors.red + "CommandError: " + colors.orange + "Path " + colors.cyan + Path + colors.orange + " does not exist!" + colors.reset);
		return -1
	}
	let Config = await import(Path + "/xion.config.js")
	return await Start(Port, {...Config, Path});
}