
function checkIfCallFromProperty(descriptor) {
	if (descriptor === undefined) return;
	throw SyntaxError(`This type annotation only for property and parameters!`);
}

function rtts(target, key:string, type:string) :any {

	let isStatic = target.hasOwnProperty(key),
		_target, val;

	if (isStatic) {
		val = target[key];
		_target = target;
	}
	else {
		_target = this;
	}

	return {
		set: function (val) {
			let ctype = typeof val;
			if (ctype !== type)
				throw new TypeError(`Set ${key}=${val}. Type '${ctype}' is not assignable to type '${type}'`);
			_target['__meta__' + key] = val;
		},
		get: function () {
			if (isStatic) {
				if (target['__meta__'+key] === undefined) this['__meta__'+key] = val;
			}
			return _target['__meta__' + key];
		}
	}
}

function t_number(target, key:string, descriptor?:any):any {
	checkIfCallFromProperty(descriptor);
	return rtts(target, key, 'number');
}

function t_string(target, key:string, descriptor?:any):any {
	checkIfCallFromProperty(descriptor);
	return rtts(target, key, 'string');
}

function t_boolean(target, key:string, descriptor?:any):any {
	checkIfCallFromProperty(descriptor);
	return rtts(target, key, 'boolean');
}

function t_object(target, key:string, descriptor?:any):any {
	checkIfCallFromProperty(descriptor);
	return rtts(target, key, 'object');
}

function t_function(target, key:string, descriptor?:any):any {
	checkIfCallFromProperty(descriptor);
	return rtts(target, key, 'function');
}
