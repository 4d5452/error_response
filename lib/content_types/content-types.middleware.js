const router = require('express').Router();

const contentTypes = require('./content-types.js');

router.use(function(req, res, next) {
  if(req['contentTypes']) {
    throw new Error('"contentTypes" is already defined on the request object');
  }

  req['contentTypes'] = contentTypes;

  next();
});

module.exports = router;
