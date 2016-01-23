/**
 * 
 * @param target
 * @param key
 * @returns {any}
 */
function readonly(target, key:string):any {

	// define static property
	if (target.hasOwnProperty(key)) return {writable: false};

	let metaKey = '__meta__' + key;

	const get = function ():any { return this[metaKey] };

	const set = function<T>(val:T):T {
		if (this[metaKey] === undefined) return this[metaKey] = val;
		let cls = target.constructor.name;
		throw `Call [${cls}].${key} = '${val}'. Cannot assign to read only property '${key}'!`;
	};

	return { get, set };
}

