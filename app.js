const express = require('express');
const winston = require('winston')

const app = express();
const consoleTransport = new winston.transports.Console()
const myWinstonOptions = {
    transports: [consoleTransport]
}
const logger = new winston.createLogger(myWinstonOptions)

app.use(logRequest)
app.use(logError)


app.get('/', (req, res) => {
  res.status(200)
  .send('<h1>Hello, world!</h1><p>It\'s nice to meet you!</p>')
  .end();
});

app.get('/me', (req, res) => {
  res.status(200)
  .send('<h1>So this is me!</h1><p>And you cannot deny it!</p>')
  .end();
});

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  logger.info(`App listening on port ${PORT}`);
  logger.info('Press Ctrl+C to quit.');
});
// [END gae_node_request_example]

function logRequest(req, res, next) {
    logger.info(req.url)
    next()
}

function logError(err, req, res, next) {
  logger.error(err)
  next()
}

module.exports = app;
