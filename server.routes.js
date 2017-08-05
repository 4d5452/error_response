const router = require('express').Router();

const message = require(__base + 'routes/message');

router.get('/', function (req, res) {
  req.log.info("Server Ping");
  res.send(`Hello ${req.ip}`);
});

router.use('/contact/message', message);

module.exports = router;

/********************************************************/
