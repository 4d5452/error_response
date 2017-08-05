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
      res.set({
        'Accept': acceptType
        });
      let content = req.getReducedContent(acceptType);
      res.status(200).json({ 
        'Content-Type': content,
      });
    });

router.post('/', jsonParser, validate, 
  function(req, res) {
    if(!req.body || !req.getReducedContent || !req.validate){
      throw new Error('"req" object not configured properly');
    }
    /*get content of the endpoint for validation*/
    let content = req.getReducedContent(acceptType);
    let results = req.validate(content, acceptType, req.body);

    if(results) {
      /*errors found in POST body; send to client*/
      return res.status(400).json({ 'err': results });
    }
    res.status(204).send(null);

  }, function(err, req, res, next){
    let status;
    let message;

    /*check if the jsonParser encountered errors*/
    if(err.status < 500 && err.status >= 400){
      status = err.status;
      message = err.message;
    } else {
      req.log.error(err);
      status = 500;
      message = 'An error occurred during your request';
    }

    /*send error to client*/
    res.status(status).json({ 'err': message });
  }); 

module.exports = router;

/*************************************************************/

function block(req, res, next) {
  let method = req.method;
  if(ACCEPTED_METHODS.indexOf(method) === -1) {
    return res.status(405).json({ 'err': `Method ${method} Not Allowed`  });
  }
  next();
}
