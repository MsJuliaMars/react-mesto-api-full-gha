// const {STATUS_CODE} = require('./constantsError');

module.exports.options = {
  origin: [
    'http://localhost:3000',

    'https://localhost:3000',
    'localhost:3000',
  ],
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  preflightContinue: false,
  optionsSuccessStatus: 204,
  allowedHeaders: ['Content-Type', 'origin', 'Authorization'],
  credentials: true,
};
