const validation = require('./validation.js');

module.exports = middleware;
/********************************************************************/

function middleware(req, res, next) {
  let name = 'validate';

  if(req[name]) {
    throw new Error(`${name} is already defined on request object`);
  }
  req[name] = validation;
  next();
}
