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
    console.log('masuk')
    User.findById({
      _id : req.headers.id
    },{
      gcsLink : req.file.gcsUrl
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