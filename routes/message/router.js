const express = require('express');
const router = express.Router();

const jsonParser = require('body-parser').json();
const validate = require(__base + 'lib/validation');
const contentTypes = require(__base + 'lib/content_types');

router.post('/', jsonParser, contentTypes, validate, 
  function(req, res) {
    if(!req.body || !req.contentTypes || !req.validate){
      throw new Error('"req" object not configured properly');
    }
    /*get content of the endpoint for validation*/
    let content = req.contentTypes.get(req.baseUrl);
    let results = req.validate(content, req.baseUrl, req.body);
    res.status(200).json(results);

  }, function(err, req, res, next){
    /*log the error*/
    req.log.error(err);

    /*set default response information*/
    let status = 500;
    let message = 'Unknown Error';

    /*check if the jsonParser encountered errors*/
    if(jsonParseError(err.message)){
      status = err.status;
      message = err.message;
    }

    /*send error to client*/
    res.status(status).json(message);
  }); 

module.exports = router;

/*************************************************************/

function jsonParseError(message) {
  let expressions = [
    /Unexpected end of JSON input/,
    /Unexpected token ./

  ];

  for(let expression of expressions) {
    if(expression.test(message)) {
      return true;
    }
  }
  
  return false;
}
