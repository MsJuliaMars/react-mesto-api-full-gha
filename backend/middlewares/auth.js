const jwt = require('jsonwebtoken');

const { JWT_SECRET } = process.env;
const {
  MESSAGE,
} = require('../utils/constantsError');
const UnauthorizedError = require('../errors/UnauthorizedError');

module.exports = (req, res, next) => {
  // достаём авторизационный заголовок
  const { authorization } = req.headers;

  // убеждаемся, что он есть или начинается с Bearer
  if (!authorization || !authorization.startsWith('Bearer')) {
    next(new UnauthorizedError(MESSAGE.ERROR_UNAUTHORIZED));
  }
  // извлечём токен
  const token = authorization.replace('Bearer ', '');

  // верифицируем токен
  let payload;
  try {
    // попытаемся верифицировать токен
    payload = jwt.verify(token, process.env.NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (err) {
    // отправим ошибку если не получится
    next(new UnauthorizedError(MESSAGE.ERROR_UNAUTHORIZED));
  }
  req.user = payload; // записываем пейлоуд в объект запроса

  next(); // пропускаем запрос дальше
};
