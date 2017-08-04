module.exports = Content;

function Content() {
  this.definitions = {};
}
Content.prototype.get = function(type) {
  if(this.definitions[type] === undefined) {
    throw new Error(`Unknown type ${type}, rejecting request for content`);
  }
  return this.definitions[type];
}
Content.prototype.has = function(type) {
  return this.definitions[type] ? true : false;
}
Content.prototype.add = function(type, definition) {
  if(this.definitions[type] !== undefined) {
    throw new Error(`Name collision for ${type}`);
  }
  this.definitions[type] = definition;
}
Content.prototype[Symbol.iterator] = function() {
  let index = 0;
  let data = this.definitions;
  let keys = Object.keys(data);

  return {
    next: () => {
      if(index < keys.length) {
        let key = keys[index++];
        return { value: [key, data[key]], done: false };
      } else {
        this.index = 0;
        return { done: true }
      }
    }
  }
}
