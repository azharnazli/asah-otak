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

}

module.exports = UserController