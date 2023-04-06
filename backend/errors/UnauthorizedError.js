class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 401;
  }
}

// отсуствие токена, некорректный токен, невалидный пароль
module.exports = UnauthorizedError;
