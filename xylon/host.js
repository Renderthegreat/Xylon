import net from "net";
import Parse from "./parse.js";
import colors from "./colors.js";

function createHTMLResponse(htmlContent) {
	const contentType = "text/html; charset=utf-8";
	const contentLength = Buffer.byteLength(htmlContent, "utf-8");

	const response =
		`HTTP/1.1 200 OK\r\n` +
		`Content-Type: ${contentType}\r\n` +
		`Content-Length: ${contentLength}\r\n` +
		`\r\n` +
		`${htmlContent}`;

	return response;
}

function parseHttpRequest(data) {
	const lines = data.toString().split("\r\n");

	const [method, path, protocol] = lines[0].split(" ");

	const headers = {};
	for (let i = 1; i < lines.length; i++) {
		if (lines[i] === "") {
			break;
		}
		const [name, value] = lines[i].split(": ");
		headers[name] = value;
	}

	let body = "";
	if (lines.includes("")) {
		body = lines.slice(lines.indexOf("") + 1).join("\r\n");
	}

	const req = {
		method,
		path,
		protocol,
		headers,
		body,
	};

	return req;
}

export const Start = async function (Port, Config) {
	var Server = net.createServer((socket) => {
		socket.on("data", async (data) => {
			let Data = parseHttpRequest(data);
			if(typeof Config.default.main == 'function') {
				Config.default.main = Config.default.main(Data);
			}
			let Main = (await import(Config.Path + "/" + Config.default.main))
				.default;
			let Middleware = (await import(Config.Path + "/" + Config.default.middleware))
				.default
			if (!typeof Main == "object") {
				console.log(
					colors.red +
						"TypeError: " +
						colors.orange +
						"Expected type of component to be object!" +
						colors.reset,
				);
				return -1;
			}
			console.log(colors.yellow + "New Request: " + colors.cyan + Data.method + ' ' + colors.orange + Data.path + colors.reset)
			let html = await Middleware(Data, Main);
			html = Parse(html)
			let res = createHTMLResponse(html);
			socket.write(res);
			socket.end();
			console.log(colors.green + "Response Sent: " + colors.cyan + Data.method + ' ' + colors.orange + Data.path + colors.reset)
		});
	});
	Server.listen(Port, () => {});
};
