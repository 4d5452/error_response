const reducer = require('./reduce-content');
const Content = require('./Content.js');

/*Accept config array from calling funciton.  If all content is properly built,
 * return middle which has added a 'get' method from 'reduce-content to
 * the req.getContent variable*/
module.exports = (config) => {
  let content = getContent(config);
  content = getReducedContent(content);
  return middleware(content);
}

/****************************************************************/

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

function getReducedContent(content) {
  let ret = new Content();

  for(let [type, con] of content) {
    ret.add(type, reducer(type, content));
  }
  return ret;
}

/*Collect the content defined within the config object:  the config array
 * contains paths to content definitions defined for the app.  Each path must return
 * a content && types object.*/
function getContent(config) {
  let ret = new Content();

  for(let path of config) {
    let definitions = require(path);
    let content = definitions.content;
    let types = definitions.types; //like defTones
    
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
      ret.add(id, content[id]);
    }
  }
  return ret;
}
