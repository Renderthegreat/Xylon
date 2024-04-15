# Xylon

Xylon is a powerful web framework that has 0 dependencies.
Even though Xylon is small it is powerful.
Xylon is shaped like Vue, but acts like React.

## Installation
To get started run:
```shell
npm install xylon
```

Then run:
```shell
npx xylon create <project-name>
```
## Syntax
To define your html you can use the Xylon syntax:
```JavaScript
import XI from './turbo/xion.js' //Import Xion
const { div, h1, h2, h3, p, a, button } = XI //Import html tags from Xion

let myPage = {
	['html']: /*Define html export*/ {
		[head()]: {
			[meta({name:"description",content:"Xylon example page."})]:""
		}
		[body()]: {
			[h1()]: "Hello World!", //Single string declaration
			[div()]: {
				[h2()]: "Hello",
				[h2()]: "World!"
			}, //Multi element declaration
			[h3()]: [
				"Hello",
				{[h2]:"World"}
			], //Mixed declaration
			[button({onclick:"greet()"}/*Element tag declaration*/)]: "Greet"
		}
	},
	['script']: /*Define javascript export*/function () {
		function greet () {
			alert("Hello")
		}//A function to say alert "Hello"
	},
	['css']:/*Define css export*/[`
		body: {
			color: "purple";
			/*Make all text purple*/
		}`
	].join('\n')
}
export default myPage//Finally export myPage
```

You can also create your own components:
```JavaScript
import XI from './turbo/xion.js' //Import Xion
const { div, h1, h2, h3, p, a, button } = XI //Import html tags from Xion

export const html = { 
	['p']: "hi"
}
```

## Middleware
You may also want to create middleware to do so use the middleware.js file.
We will extend the middleware functionality soon.

## Thank you!
![Renderlabs logo](https://renderlabs.cloud/pixelated.png)
Part of the Renderlabs Internet Program making the internet a better place.