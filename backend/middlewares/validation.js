// eslint-disable-next-line no-unused-vars,import/no-extraneous-dependencies
const {
  celebrate,
  Joi,
} = require('celebrate'); // Валидация приходящих на сервер данных

const urlRegex = /http[s]?:\/\/(www\.)?[a-zA-Z\d-]+\.[\w\d\-.~:/?#[\]@!$&'()*+,;=]{2,}#?/;

const validateUser = celebrate({
  body: Joi.object()
    .keys({
      email: Joi.string()
        .required()
        .email(),
      password: Joi.string()
        .required(),
      name: Joi.string()
        .min(2)
        .max(30),
      avatar: Joi.string()
        .pattern(urlRegex),
      about: Joi.string()
        .min(2)
        .max(30),
    }),
});

const validateLoginUser = celebrate({
  body: Joi.object()
    .keys({
      email: Joi.string()
        .required()
        .email(),
      password: Joi.string()
        .required(),
    }),
});
const validateUpdateUser = celebrate({
  body: Joi.object()
    .keys({
      name: Joi.string()
        .required()
        .min(2)
        .max(30),
      about: Joi.string()
        .required()
        .min(2)
        .max(30),
    }),
});

const validateAvatarUser = celebrate({
  body: Joi.object()
    .keys({
      avatar: Joi.string()
        .required()
        .pattern(urlRegex),
    }),
});

const validateCard = celebrate({
  body: Joi.object()
    .keys({
      name: Joi.string()
        .required()
        .min(2)
        .max(30),
      link: Joi.string()
        .required()
        .pattern(urlRegex),
    }),
});

const validateCardId = celebrate({
  params: Joi.object()
    .keys({
      cardId: Joi.string()
        .hex()
        .length(24)
        .required(),
    }),
});

const validateUserId = celebrate({
  params: Joi.object()
    .keys({
      userId: Joi.string()
        .hex()
        .length(24)
        .required(),
    }),
});

module.exports = {
  validateUser,
  validateLoginUser,
  validateUpdateUser,
  validateAvatarUser,
  validateCard,
  validateCardId,
  validateUserId,
};
