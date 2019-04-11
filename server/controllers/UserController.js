const User = require('../models/user')
const axios = require('axios')

class UserController{
  static createUser(req, res) {
    User.create(req.body)
      .then((user)=> {
        res.status(201).json(user)
      })
      .catch(err => {
        res.status(500).json(err)
      })
  }

  static uploadImage(req, res) {
    User.findByIdAndUpdate({
      _id : req.headers.id
    },{
      gcsLink : req.file.gcsUrl
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

}

module.exports = UserController