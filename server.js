/* npm packages */
const bunyan = require('bunyan');
const express = require('express');
const helmet = require('helmet');
const path = require('path');

/* set a global path to server entry: server.js */
global.__base = path.join(__dirname + '/');

/* config files */
const server_config = require('./server.config.js')();
const bunyan_config = require('./bunyan.config.js')(server_config.name);
const content_config = require('./content.config.js');

/* routes */
const server_routes = require('./server.routes.js');

/* content-types */
const content = require('./lib/content_types')(content_config);

const app = express();
const log = bunyan.createLogger(bunyan_config);


/* Third party extensions */
app.use(helmet());

/* Application specific routes */
app.use(appendLog);
app.use(content);
app.use('', server_routes);
app.use(notFoundHandler);
app.use(errorHandler);

/* Start the nodejs application */
app.listen(server_config.port, server_config.host, function() {
  log.info(`Started ${server_config.host} on port: ${server_config.port}`);
});

/************************************FUNCTIONS**********************/
/* Log for all request */
function appendLog(req, res, next) {
  req.log = log.child({ 
    'ip': req.ip, 'method': req.method, 'url': req.originalUrl
  });
  next();
};

/* 404 response handler */
function notFoundHandler(req, res, next) {
  req.log.warn("File not found (404)");
  res.status(404).sendFile(path.join(__dirname, '404.html'));
};

/* Error Handler */
function errorHandler(err, req, res, next) {
  req.log.error(err);
  if(res.headersSent) {
    return next(err);
  }
  res.status(500).sendFile(path.join(__dirname, '500.html'));
};

