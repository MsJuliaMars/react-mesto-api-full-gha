class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 400;
  }
}

// eslint-disable-next-line max-len
// 400 — переданы некорректные данные в методы создания карточки, пользователя, обновления аватара пользователя или профиля;
module.exports = BadRequestError;
