const routes = require('express')
  .Router();
const {
  login,
  createUser,
} = require('../controllers/users');
const {
  validateLoginUser,
  validateUser,
} = require('../middlewares/validation');

// регистрация пользователя и его создание
routes.post('/signup', validateUser, createUser);
// логин пользователя
routes.post('/signin', validateLoginUser, login);

module.exports = routes;
