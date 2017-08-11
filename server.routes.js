const router = require('express').Router();

const test = require(__base + 'routes/test');

router.get('/', function (req, res) {
  req.log.info("Server Ping");
  res.send(`Hello ${req.ip}`);
});

router.use('/test', test);

module.exports = router;

/********************************************************/
