module.exports = Content;

/*
 * Class: Definitions are key:value pairs that represent an endpoints content-type.
 *    Each key is a unique identifier for each content-type.
 */
function Content() {
  this.definitions = {};
}

/*Return definition for the content-type*/
Content.prototype.get = function(type) {
  if(this.definitions[type] === undefined) {
    // if it does not exist, throw an error.  This should be caught before use.
    throw new Error(`Unknown type ${type}, rejecting request for content`);
  }
  return this.definitions[type];
}

/*Check for the existance of a content-type based upon its identifier*/
Content.prototype.has = function(type) {
  return this.definitions[type] ? true : false;
}

/*Insert a new type into the structure*/
Content.prototype.add = function(type, definition) {
  if(this.definitions[type] !== undefined) {
    // each entry must be unique.  Fail fast if this is not the case.
    throw new Error(`Name collision for ${type}`);
  }
  this.definitions[type] = definition;
}

/*Iterator for the data structure*/
Content.prototype[Symbol.iterator] = function() {
  let index = 0;
  let data = this.definitions;
  let keys = Object.keys(data);

  return {
    next: () => {
      if(index < keys.length) {
        let key = keys[index++];
        // allows for ...of e.g. (let [key, value] of ...)
        return { value: [key, data[key]], done: false };
      } else {
        this.index = 0;
        return { done: true }
      }
    }
  }
}
