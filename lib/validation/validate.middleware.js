const express = require('express');
const router = express.Router();

const validation = require('./validation.js');

router.use(function(req, res, next) {
  if(req['validation']) {
    throw new Error('"validation" is already defined on request object');
  } 

  req['validate'] = validation.validate;
//    .validate(req.contentTypes.getType(req.baseUrl), req.body);

  next();
});// end router.use

module.exports = router;
