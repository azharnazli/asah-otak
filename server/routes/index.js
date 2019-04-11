const routes =  require('express').Router()
const quiz = require('./quiz')
const users = require('./user')

routes.use('/quiz', quiz)
routes.use('/users', users)



module.exports  = routes