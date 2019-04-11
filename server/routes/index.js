const routes =  require('express').Router()
const quiz = require('./quiz')
const users = require('./user')
const google = require('./google-storage')

routes.use('/quiz', quiz)
routes.use('/users', users)
routes.use('/google', google)



module.exports  = routes