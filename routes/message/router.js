const express = require('express');
const router = express.Router();

const jsonParser = require('body-parser').json();
const validate = require(__base + 'lib/validation');

const TYPES = require('./content.js').getTypes;

router.post('/', jsonParser, validate, 
  function(req, res) {
    if(!req.body || !req.validate){
      throw new Error('"req" object not configured properly');
    }
    /*get content of the endpoint for validation*/
    let contentType = req.getContent(TYPES['contact-message']);
    let results = req.validate(contentType, req.baseUrl, req.body);

    if(results) {
      /*errors found in POST body; send to client*/
      return res.status(400).json(results);
    }
    res.status(200).send('OK');

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
    res.status(status).send(message);
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
