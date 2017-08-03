const router = require('express').Router();

const reduce = require('./reduce-for-validation.js');

let content = {};

module.exports = (config) => {
  content = buildContent(config);
  router.use(reducer);
  return router;
}

/****************************************************************/
function reducer(req, res, next) {
  req.getContent = reduce(content);
  next();
}


function buildContent(config) {
  let ret = {};

  for(let path of config) {
    let content = require(path).getContent;
    for(let type in content) {
      if(!ret[type] === null) {
        throw new Error(`Name collision for ${type}`);
      }
      ret[type] = content[type];
    }
  }
  return ret;
}
