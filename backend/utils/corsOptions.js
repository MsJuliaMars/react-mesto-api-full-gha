module.exports.options = {
  origin: [
    'https://mesto.kozhevnikova.nomoredomains.work',
    'http://mesto.kozhevnikova.nomoredomains.work',
    'http://localhost:3001',
    'localhost:3001',
  ],
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  preflightContinue: false,
  optionsSuccessStatus: 204,
  allowedHeaders: ['Content-Type', 'origin', 'Authorization'],
  credentials: true,
};
