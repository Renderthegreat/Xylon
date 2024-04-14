import info from '../xylon.js';
import colors from '../colors.js';

export default async function (params) {
	if (params[0]) {
		try {
			let detail = info;
			for (const param of params) {
				if (param) {
					detail = detail[param];
				}
			}
			if (typeof detail == "undefined") {
				console.log(colors.red + 'No such property: ' + colors.cyan + params + colors.reset);
				return -1;
			}
			console.log(detail);
		}
		catch (e) {
			console.log(colors.red + e)
			return -1;
		}
	}
	else {
		console.log(`xylon version ${info.version}`);
	}
}