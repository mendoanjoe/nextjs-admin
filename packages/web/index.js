'use strict';

const next = require('next');
const nextAuth = require('next-auth');


require('dotenv').load();

process.on('uncaughtException', function(err) {
  console.error('Uncaught Exception: ', err);
});

process.on('unhandledRejection', (reason, p) => {
  console.error('Unhandled Rejection: Promise:', p, 'Reason:', reason);
});

process.env.NODE_ENV = process.env.NODE_ENV || 'production';
process.env.PORT = process.env.PORT || 80;

const nextApp = next({
  dir: '.',
  dev: (process.env.NODE_ENV === 'development')
});

nextApp
.prepare()
.then(nextAuthOptions => {
  return nextAuth(nextApp, nextAuthOptions);
})
.then(nextAuthOptions => {
  const expressApp = nextAuthOptions.expressApp;

  expressApp.all('*', (req, res) => {
    let nextRequestHandler = nextApp.getRequestHandler();
    return nextRequestHandler(req, res);
  });

  expressApp.listen(process.env.PORT, err => {
    if (err) {
      throw err;
    }
    console.log('> Ready on http://localhost:' + process.env.PORT + ' [' + process.env.NODE_ENV + ']');
  });
})
.catch(err => {
  console.log('An error occurred, unable to start the server');
  console.log(err);
});
