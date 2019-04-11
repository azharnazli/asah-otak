const routes = require('express').Router()
const UserController = require('../../controllers/UserController')


routes.post('/', UserController.createUser )


module.exports = routes