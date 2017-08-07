const reducer = require('./reduce-content');
const Content = require('./Content.js');

/*
 * @name: index.js
 * @description: accepts a configuration object with paths to required contents.  Returns a 
 *    new middleware function that inserts a 'getContent' function to the request object.
 *    This functions returns the reduced form of the path defined object. 
 * @args: config
 * @return: middleware function
 */
module.exports = (config) => {
  // get the un-altered content first
  let content = getContent(config);
  // reduce for later use
  content = getReducedContent(content);
  // return for use in the app
  return middleware(content);
}

/****************************************************************/
/*
 * Adds new function to the request object.  Use this function to return the reduced 
 *  path object.
 */
function middleware(content) {
  let name = 'getContent';

  return function(req, res, next) {
    if(req[name]) {
      throw new Error(`${name} has already been defined on the request object`);
    }
    req[name] = (type) => content.get(type);
    next();
  }
}

/*
 *  Reduce the content definition to a more manageable object.  Do so for all 
 *    content types defined in content.
 */
function getReducedContent(content) {
  let ret = new Content();

  for(let [type, con] of content) {
    ret.add(type, reducer(type, content));
  }
  return ret;
}

/*
 *  Accepts a config object with paths to content definitions for the application.  For 
 *    each path, get its type and content.  The type represents a unique identifier for
 *    each content type.  TODO: implement new 'class' for the content management system.
 */
function getContent(config) {
  let ret = new Content();

  for(let path of config) {
    let definitions = require(path);
    let content = definitions.content;
    let types = definitions.types;
    
    // all content definitions must have a content and types object exported
    if(!content) { 
      throw new Error(`'content' not defined at ${path}`);
    }
    if(!types) {
      throw new Error(`'types' not defined at ${path}`);
    }

    for(let type in types) {
      let id = types[type];

      if(!content[id]) { // type defined in types block but not in content
        throw new Error(`Type ${id} defined but not supported`);
      }
      // add the type to the return object
      ret.add(id, content[id]);
    }
  }
  return ret;
}
