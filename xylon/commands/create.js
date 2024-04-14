import fs from "fs";
import { cwd } from "process";
import colors from "../colors.js";
import path from "path";

function copyDirectory(src, dest) {
	fs.mkdirSync(dest, { recursive: true });
	const files = fs.readdirSync(src);

	files.forEach((file) => {
		const srcPath = path.join(src, file);
		const destPath = path.join(dest, file);

		if (fs.statSync(srcPath).isDirectory()) {
			copyDirectory(srcPath, destPath);
		} else {
			fs.copyFileSync(srcPath, destPath);
		}
	});
}


export default async function (params) {
	if (params[0]) {
		let Dir = params[0];
		fs.mkdirSync(Dir);
		copyDirectory(import.meta.dirname + '/' + "../template", cwd() + '/' + Dir);
		return 0;
	} else {
		console.log(
			colors.red +
				"CommandError: " +
				colors.orange +
				"No name specified!\n" +
				colors.white +
				"Usage: " +
				colors.cyan +
				"npx xylon create " +
				colors.orange +
				"<name>" +
				colors.reset,
		);
		return -1;
	}
}
