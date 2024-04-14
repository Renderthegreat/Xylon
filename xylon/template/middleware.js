import XI from "./turbo/xion.js"
const { h1, h2, h3, h4, h5, h6, p, a, button} = XI

export default async function (req, app) {
	/*
	Define your own logic here :)
	*/
	switch (req.path) {
		case "/": {
			return app
		}
		case "/example": {
			app[['html']] = {
				[h1()]: "Hello World!",
				[p()]: "This is an example page!"
			}
			return app
		}
		default: {
			app[['html']] = {
				[h1()]: "404 Not Found",
				[p()]: "The page you are looking for does not exist!"
			}
			console.log(res.path)
			return app
		}
	}
}