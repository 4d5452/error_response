const router = require('express').Router();
const cors = require('cors'); 

const jsonParser = require('body-parser').json();
const validate = require(__base + 'lib/validation');

const types = require('./content.js').types;
const acceptType = types['contact-message'];

const ACCEPTED_METHODS = [ 
  'POST', 'OPTIONS'
  ];
const corsOptions = {
  'preflightContinue': true,
  'methods': ACCEPTED_METHODS
}

router.all('*',  block);
router.use(cors(corsOptions));

router.options('/',
    function(req, res) {
      let content = req.getContent(acceptType);
      res.status(200).json({ 
        'Accept': acceptType,
        'Content-Type': content
      });
    });

router.post('/', jsonParser, validate, 
  function(req, res) {
    if(!req.body || !req.getContent || !req.validate){
      throw new Error('"req" object not configured properly');
    }
    /*get content of the endpoint for validation*/
    let content = req.getContent(acceptType);
    let results = req.validate(content, acceptType, req.body);

    if(results) {
      /*errors found in POST body; send to client*/
      return res.status(200).json(req.errors.format(results));
    }
    res.status(204).send(null);

  }, function(err, req, res, next){

    let status;
    let message;

    if(req.errors.has(err.status)){
      status = err.status;
      message = req.errors.get(err.status);
    } else {
      status = 500;
      message = req.errors.get(status);
    }

    req.log.error(err);
    /*send error to client*/
    res.status(status).json(message);
  }); 

module.exports = router;

/*************************************************************/

function block(req, res, next) {
  let method = req.method;
  if(ACCEPTED_METHODS.indexOf(method) === -1) {
    return res.status(405).json(req.errors.get(405));
  }
  next();
}
