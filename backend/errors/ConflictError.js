class ConflictError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 409;
  }
}

// попытка зарегистрировать вторую учетную запись на тот же email
module.exports = ConflictError;
