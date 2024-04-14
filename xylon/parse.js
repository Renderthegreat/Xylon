function parseObjectToAttributes(obj) {
	let attributes = "";
	for (let key in obj) {
		if (obj.hasOwnProperty(key)) {
			attributes += ` ${key}="${obj[key]}"`;
		}
	}
	return attributes;
}

export default function (C) {
	let Cx = C[["html"]];
	if (!typeof C == "object") {
		return -1;
	}
	let Out = "<html>";
	let Indent = 0; // Todo: add indent
	let [BodyC, HeadC] = [0, 0];
	function Loop(Component) {
		for (let key in Component) {
			if (!typeof Component[key] == "object") {
				return -3;
			}
			let XP = JSON.parse(key);
			
			Out +=
				"\n" + "<" + XP.element + parseObjectToAttributes(XP.params) + ">";
			if (XP.element == "body") {
				if (BodyC != 0) {
					return -6;
				}
				BodyC++;
				if (C[["script"]]) {
					if (typeof C[["script"]] != "function") {
						return -7;
					}
					Out += "<script>";
					let Fn = eval("(" + C[["script"]] + ")");
					Fn = Fn.toString();
					Fn = Fn.replace(/function \(.*\) \{/, "");
					Fn = Fn.slice(0, -1);
					Out += Fn;
					Out += "</script>";
				}
			}
			if (XP.element == "head") {
				if (HeadC != 0) {
					return -5;
				}
				HeadC++;
				if (C[["css"]]) {
					Out += "<style>";
					Out += C[["css"]];
					Out += "</style>";
				}
			}
			if (Component[key] instanceof Array) {
				for (let item in Component[key]) {
					if (typeof Component[key][item] == "object") {
						Loop(Component[key][item]);
					} else {
						Out += Component[key][item];
					}
				}
				Out += "</" + XP.element + ">";
			} else {
				if (typeof Component[key] == "object") {
					Loop(Component[key]);
				} else {
					Out += Component[key];
				}
				Out += "\n" + "</" + XP.element + ">";
			}
		}
	}
	let s = Loop(Cx);
	if (s) {
		return s;
	}
	Out += "</html>";

	return Out;
}
