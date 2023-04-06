// eslint-disable-next-line import/no-extraneous-dependencies
const jwt = require('jsonwebtoken');
const {JWT_SECRET} = process.env;
const {
  MESSAGE,
} = require('../utils/constantsError');
const UnauthorizedError = require('../errors/UnauthorizedError');

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  // достаём авторизационный заголовок
  const { authorization } = req.headers;

  // убеждаемся, что он есть или начинается с Bearer
  if (!authorization || !authorization.startsWith('Bearer')) {
    throw new UnauthorizedError(MESSAGE.ERROR_UNAUTHORIZED);
  }
  // извлечём токен
  const token = authorization.replace('Bearer ', '');

  // верифицируем токен
  let payload;
  try {
    // попытаемся верифицировать токен
    // eslint-disable-next-line no-unused-vars
    payload = jwt.verify(token, process.env.NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (err) {
    // отправим ошибку если не получится
    throw new UnauthorizedError(MESSAGE.ERROR_UNAUTHORIZED);
  }
  req.user = payload; // записываем пейлоуд в объект запроса

  next(); // пропускаем запрос дальше
};
