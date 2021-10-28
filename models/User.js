const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'must provide name'],
    maxlength: [20, 'name can not be more than 20 characters'],
  },
  email: {
    type: String,
    required: [true, 'must provide email'],
    maxlength: [20, 'email can not be more than 20 characters'],
  },
  passwordHash: {
    type: String,
    required: true,
  },
})

module.exports = mongoose.model('User', UserSchema)
