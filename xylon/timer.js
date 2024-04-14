export default class {
	static wait = async function (ms) {
		return new Promise((resolve) => {
			setTimeout(resolve, ms);
		});
	}
}