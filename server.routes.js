const router = require('express').Router();

const message = require(__base + 'routes/message');
const content = require(__base + 'routes/content');

router.get('/', function (req, res) {
  req.log.info("Server Ping");
  res.send(`Hello ${req.ip}`);
});

router.use('/contact/message', message);
router.use('/content', content);

module.exports = router;

/********************************************************/


function setHeader(req, res, next) {
  res.set({
    'Accept': routeToType['/contact/message'],
    'Content-Type': 'application/json'
  });
  next();
}
