require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
// eslint-disable-next-line import/no-extraneous-dependencies
const cookieParser = require('cookie-parser');
const cors = require('cors');
// eslint-disable-next-line import/no-extraneous-dependencies
const { errors } = require('celebrate');
// eslint-disable-next-line import/no-extraneous-dependencies
const helmet = require('helmet');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const routes = require('./routes/index');
const handleError = require('./middlewares/handleError');
const auth = require('./middlewares/auth');
const NotFound = require('./errors/NotFound');
const {corsOptions} = require('./utils/corsOptions');
const path = require("path");
const {
  requestLogger,
  errorLogger,
} = require('./middlewares/logger');
const
  { PORT = 3000 } = process.env;

mongoose.connect('mongodb://localhost:27017/mestodb', {});

const app = express(); // запускаем наш express
// app.use(express.static(path.join(__dirname, 'build')));
app.use(express.static(__dirname));

app.get("/*", function(req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});
app.use('*', cors(corsOptions));
app.use(helmet());
app.use(cookieParser());
app.use(bodyParser.json()); // для собирания JSON-формата
app.use(bodyParser.urlencoded({ extended: true })); // для приёма веб-страниц внутри POST-запроса
app.use(requestLogger);
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use(routes);
app.use(auth);
app.use('/', usersRouter);
app.use('/', cardsRouter);

// Обработка неправильного пути '*'
app.use('*', (req, res, next) => {
  next(new NotFound('Обработка неправильного пути'));
});
app.use(errorLogger);
app.use(errors()); // обработчик ошибок celebrate
app.use(handleError);
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});
