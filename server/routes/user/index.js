const routes = require('express').Router()
const UserController = require('../../controllers/UserController')


routes.post('/', UserController.createUser )
routes.post('/login', UserController.loginNormalUser )


module.exports = routes