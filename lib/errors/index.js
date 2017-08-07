const ERRORS = {
  '400': formatError('Bad Request (400)'),
  '404': formatError('Not Found (404)'),
  '405': formatError('Method Not Allowed (405)'),
  '500': formatError('Internal Server Error (500)')
}

module.exports = middleware;

/*************************************************************/

function middleware(req, res, next) {
  if(req.errors) {
    throw new Error('Request object (req) contains an "errors" object');
  }
  req.errors = {};
  req.errors.get = getError;
  req.errors.has = hasError;
  req.errors.format = formatError;

  next();
}

function getError(value) {
  let status = value + '';
  if(!ERRORS[status]) {
    throw new Error('Unsupported Error');
  }
  return ERRORS[status];
}

function hasError(value) {
  let status = value + '';
  return ERRORS[status] ? true : false;
}

function formatError(message) {
  return { 'err': message }
}
