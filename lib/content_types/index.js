const router = require('express').Router();

const reducer = require('./reduce-content');
const Content = require('./Content.js');

let reducedContent = new Content();
let content = new Content();

router.use(function(req, res, next) {
  if(req.getReducedContent) {
    throw new Error('"getReducedContent" has already been defined on the request object');
  }
  req.getReducedContent = (type) => reducedContent.get(type);
  next();
});

/*Accept config array from calling funciton.  If all content is properly built,
 * return router which has added a 'get' method from 'reduce-for-validation to
 * the req.getContent variable*/
module.exports = (config) => {
  buildContent(config);
  getReducedContent();
  return router;
}

/****************************************************************/

function getReducedContent() {
  for(let [type, con] of content) {
    reducedContent.add(type, reducer(type, content));
  }
}

function buildContent(config) {

  for(let path of config) {
    let definitions = require(path);
    let defContent = definitions.content;
    let defTypes = definitions.types; //like defTones
    
    // all content definitions must have a content and types object exported
    if(!defContent) { 
      throw new Error(`'content' not defined at ${path}`);
    }
    if(!defTypes) {
      throw new Error(`'types' not defined at ${path}`);
    }

    for(let type in defTypes) {
      let id = defTypes[type];

      if(!defContent[id]) { // type defined in types block but not in content
        throw new Error(`Type ${id} defined but not supported`);
      }
      content.add(id, defContent[id]);
    }
  }
}
