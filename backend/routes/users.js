const routesUsers = require('express')
  .Router(); // создали роутер
const {
  getUsers,
  getUserID,
  updateUser,
  updateUserAvatar,
  getCurrentUser,
} = require('../controllers/users');
const {
  validateUpdateUser,
  validateAvatarUser,
  validateUserId,
} = require('../middlewares/validation');

routesUsers.get('/users', getUsers); // возвращает всех пользователей
routesUsers.get('/users/me', getCurrentUser); // возвращает информацию о текущем пользователе
routesUsers.get('/users/:userId', validateUserId, getUserID); // возвращает пользователя по _id
routesUsers.patch('/users/me', validateUpdateUser, updateUser); // обновляет профиль
routesUsers.patch('/users/me/avatar', validateAvatarUser, updateUserAvatar); // обновляет профиль автар

module.exports = routesUsers; // экспортировали роутер
