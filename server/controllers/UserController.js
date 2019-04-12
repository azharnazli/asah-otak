const User = require('../models/user')
const axios = require('axios')
const { compare } = require('../helpers/bcrypt')
const { sign }  = require('../helpers/jwt')

class UserController {
  static createUser(req, res) {
    User.create({
      email : req.body.email,
      password : req.body.password,
      gcsLink : '',
      score : 0
    })
      .then((user) => {
        res.status(201).json(user)
      })
      .catch(err => {
        res.status(500).json(err)
      })
  }

  static uploadImage(req, res) {
    User.findByIdAndUpdate({
        _id: req.authenticated._id
      }, {
        gcsLink: req.file.gcsUrl
      },{
        new : true
      })
      .then(user => {
        res.status(200).json(user)
      })
      .catch(err => {
        res.status(500).json(err)
      })
  }

  static loginNormalUser(req, res) {
    User.findOne({
        email: req.body.email
      })
      .then((foundUser) => {
        if (!foundUser) {
          res.status(500).json({
            errors: `wrong email`
          })
        } else {
          if (!compare(req.body.password, foundUser.password)) {
            res.status(500).json({
              errors: `wrong password `
            })
          } else {
            console.log(foundUser)
            let token = sign({
              _id: foundUser._id,
              email: req.body.email,
              image : foundUser.gcsLink
            }, {

            })
            res.status(200).json({
              token,
              email: req.body.email,
              image : foundUser.gcsLink
            })
          }
        }
      })
      .catch(err => {
        res.status(500).json(err.message)
      })
  }


}

module.exports = UserController