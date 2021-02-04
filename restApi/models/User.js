const { Schema, model } = require('mongoose');

const schema = new Schema({
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
  }
})

module.exports = model('User', schema);