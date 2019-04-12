const routes  = require('express').Router()
const QuizController = require('../../controllers/QuizController')

routes.get('/', QuizController.fetchQuizDdata)


module.exports = routes