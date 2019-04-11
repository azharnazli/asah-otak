const axios = require('axios')

class QuizController{
  static fetchQuizDdata(req, res) {
    axios.get('https://opentdb.com/api.php?amount=10')
      .then(({data}) => {
        res.status(200).json(data.results)
      })
      .catch(err => {
        res.status(500).json(err)
      })
  }
}

module.exports = QuizController