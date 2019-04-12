const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { hash } = require('../helpers/bcrypt')

const UserSchema = new Schema({
  // name : String,
  email : String,
  score : Number,
  gcsLink : String,
  password: String,
})

UserSchema.pre('save', function (next) {
  this.password = hash(this.password)
  next()
})


const User = mongoose.model('User', UserSchema)

module.exports = User