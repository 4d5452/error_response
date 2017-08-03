const express = require('express');
const router = express.Router();

const contentTypes = require(__base + 'lib/content_types');

router.get('/:type', 
  function(req, res) {

    let contentType = contentTypes.get(req.params['type']);

    res.status(200).json(contentType);

  }, function(err, req, res, next){
    /*log the error*/
    req.log.error(err);

    /*set default response information*/
    let status = 500;
    let message = 'Unknown Error';

    /*send error to client*/
    res.status(status).json(message);
  }); 

module.exports = router;

/*************************************************************/
