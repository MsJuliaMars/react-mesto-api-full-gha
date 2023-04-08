// eslint-disable-next-line import/no-extraneous-dependencies
const bcrypt = require('bcryptjs'); // модуль для хеширования пароля
// eslint-disable-next-line import/no-extraneous-dependencies
const jwt = require('jsonwebtoken'); // модуль jsonwebtoken модуль для создания токена
const {JWT_SECRET} = process.env;
const User = require('../models/user');
const NotFound = require('../errors/NotFound');
// eslint-disable-next-line quotes
const {
  STATUS_CODE,
  MESSAGE,
} = require('../utils/constantsError');
const BadRequestError = require('../errors/BadRequestError');
const ConflictError = require('../errors/ConflictError');

// GET /users — возвращает всех пользователей
const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.status(STATUS_CODE.OK)
      .send({users}))
    .catch(next);
};

// GET /users/:userId - возвращает пользователя по _id
const getUserID = (req, res, next) => {
  User.findById(req.params.userId)
    .orFail(new NotFound(`Извините, пользователь _id=${req.params.userId} не найден.`))
    .then((user) => {
      res.status(STATUS_CODE.OK)
        .send({data: user});
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Некорректный userID '));
      } else {
        next(err);
      }
    });
};

// POST /signup - регистрация пользователя и соответсвено его создание
const createUser = (req, res, next) => {
  const {
    name,
    about,
    avatar,
  } = req.body;
  bcrypt.hash(req.body.password, 10)
    .then((hash) => User.create({
      name,
      about,
      avatar,
      email: req.body.email,
      password: hash,
    }))
    .then((user) => res.status(STATUS_CODE.OK)
      .send({
        name: user.name,
        about: user.about,
        avatar: user.avatar,
        email: user.email,
        _id: user._id,
      }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(MESSAGE.ERROR_CREATE_USER));
      } else if (err.code === 11000) {
        next(new ConflictError(MESSAGE.ERROR_CONFLICT_EMAIL));
      } else {
        next(err);
      }
    });
};

// GET /users/me - возвращает информацию о текущем пользователе
// eslint-disable-next-line consistent-return
const getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(new NotFound(MESSAGE.USER_NOT_FOUND))
    .then((user) => res.send(user))
    .catch(next);
};

// POST /signin контроллер аутентификации
const login = (req, res, next) => {
  const {
    email,
    password,
  } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      // eslint-disable-next-line no-underscore-dangle
      const token = jwt.sign({_id: user._id}, process.env.NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', {expiresIn: '7d'});
      // res.cookie('jwt', token, {
      //   httpOnly: true,
      //   maxAge: 3600000 * 7,
      // }); // возвращаем токен
      res.status(STATUS_CODE.OK)
        .send({
          message: MESSAGE.SUCCESS_AUTH,
          token,
        });
    })
    .catch(next);
};

// PATCH /users/me — обновляет профиль
const updateUser = (req, res, next) => {
  const {
    name,
    about,
  } = req.body;
  User.findByIdAndUpdate(req.user._id, {
    name,
    about,
  }, {
    new: true,
    runValidators: true,
  })
    .orFail(() => {
      // eslint-disable-next-line no-new
      throw new NotFound(MESSAGE.USER_NOT_FOUND);
    })
    .then((user) => {
      res.status(STATUS_CODE.OK)
        .send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(new BadRequestError(MESSAGE.ERROR_UPDATE_PROFILE));
      } else {
        next(err);
      }
    });
};

// PATCH /users/me/avatar — обновляет аватар
const updateUserAvatar = (req, res, next) => {
  const {avatar} = req.body;
  // eslint-disable-next-line max-len
  User.findByIdAndUpdate(req.user._id, {avatar}, {
    new: true,
    runValidators: true,
  })
    .orFail(() => {
      // eslint-disable-next-line no-new
      throw new NotFound(`Извините, пользователь _id=${req.params.userId} не найден.`);
    })
    .then((user) => res.status(STATUS_CODE.OK)
      .send(user))
    .catch(next);
};

module.exports = {
  getUsers,
  getUserID,
  createUser,
  updateUser,
  updateUserAvatar,
  login,
  getCurrentUser,
};
