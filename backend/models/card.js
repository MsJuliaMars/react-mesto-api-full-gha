const mongoose = require('mongoose');
const isURL = require('validator/lib/isURL');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 30,
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator(url) {
        return isURL(url);
      },
      message: 'Переданы некорректные данные в поле /Link/',
    },

  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    default: [],
    ref: 'user',
  },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('card', cardSchema);
