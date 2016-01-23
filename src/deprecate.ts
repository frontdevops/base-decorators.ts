

/**
 * 
 * @param target
 * @param key
 * @param descriptor
 * @returns {any}
 */
function deprecate(target:any, key:string, descriptor? :any) {

	if (descriptor === undefined)
		throw new SyntaxError('Only methods can be marked as deprecated!');

	let cls = target.constructor.name;
	let originalMethod = descriptor.value;

	descriptor.value = function deprecate() {
		console.warn(`WARNING! Method ${key}() from #${cls} is deprecated!`);
		return originalMethod.apply(this, arguments);
	};

	return descriptor;
}
