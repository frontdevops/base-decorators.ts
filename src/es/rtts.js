
function t_number(target, key, descriptor) {
  let newDesc = {
    set: function(val) {
      let type = typeof val;
      if (type !== 'number') {
        throw new TypeError(`Set ${key}=${val}. Type '${type}' is not assignable to type 'number'`);
      }
      this['__meta__'+key] = val;
    },
    get: function() {
      if (this['__meta__'+key] === undefined) {
        this['__meta__'+key] = descriptor.initializer();
      }
      return this['__meta__'+key];
    } 
  }
  
  return newDesc;
}
