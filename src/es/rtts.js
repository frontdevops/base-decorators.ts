
function rtts(target, key, descriptor, type) {

  if (type != 'function' && typeof descriptor.initializer() == 'function') {
   throw SyntaxError(`This type annotation only for property and parameters!`);
  }

  return {
    set: function(val) {
      let ctype = typeof val;
      if (ctype !== type)
        throw new TypeError(`Set ${key}=${val}. Type '${ctype}' is not assignable to type '${type}'`);
      this['__meta__'+key] = val;
    },
    get: function() {
      if (this['__meta__'+key] === undefined){
        if (descriptor.initializer)
          this['__meta__'+key] = descriptor.initializer();
      }
      return this['__meta__'+key];
    } 
  }  
}

function t_number(target, key, descriptor) {
  return rtts(target, key, descriptor, 'number');
}

function t_string(target, key, descriptor) {
  return rtts(target, key, descriptor, 'string');
}

function t_boolean(target, key, descriptor) {
  return rtts(target, key, descriptor, 'boolean');
}

function t_object(target, key, descriptor) {
  return rtts(target, key, descriptor, 'object');
}

function t_function(target, key, descriptor) {
  return rtts(target, key, descriptor, 'function');
}
