const { Schema, model } = require('mongoose');

const schema = new Schema({
  userId: {
    type: Number,
    required: true
  },
  userName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    default: '',
  },
  rights: {
    type: Schema.Types.Mixed,
    default: ['user']
  },
  animation: {
    type: Schema.Types.Mixed,
    default: {
      done: [],
      queue: [],
      selected: []
    }
  },
  animationRating: {
    type: Schema.Types.Mixed,
    default: {
      0: 0
    }
  }
})

module.exports = model('Users', schema);