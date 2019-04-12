new Vue({
  el: '#app',
  data: {
    currentPage: '',
    message: 'Hello world-nya phase 2',
    isLoggedIn: false,
    questions: [],
    correctAnswers: [],
    chosenAnswers: [],
    tes: '',
    score: '',
    score2: false
  },
  methods: {
    submission: function(ans) {
      // console.log(this.correctAnswers)
      // console.log(ans)
      ans = Object.values(ans)
      let betul = 0
      for(let i = 0; i < ans.length; i++) {
        if(ans[i] === this.correctAnswers[i]) {
          betul+=10
        }
      }
      // console.log(`betul ${betul}`)
      let url = `https://dummyimage.com/600x400/000000/fff&text=${betul}`
      this.score = url
      this.score2 = true
    }
  },
  created() {
    console.log(`Getting questions from API...`)
    axios.get('https://opentdb.com/api.php?amount=10')
    .then(({data}) => {
      // &#039; ' apostrophe
      // &amp; & ampersand
      // &quot; " quote
      console.log(data.results)
      console.log(`replacing text encoding...`)
      let questionsList = data.results.map(item => {
        // question
        item.question = item.question.replace(/&#039;/g, `'`)
        item.question = item.question.replace(/&amp;/g, `&`)
        item.question = item.question.replace(/&quot;/g, `"`)
        // correct answer
        item.correct_answer = item.correct_answer.replace(/&#039;/g, `'`)
        item.correct_answer = item.correct_answer.replace(/&amp;/g, `&`)
        item.correct_answer = item.correct_answer.replace(/&quot;/g, `"`)
        // incorrect answers
        for(item2 in item.incorrect_answers) {
          item2 = item2.replace(/&#039;/g, `'`)
          item2 = item2.replace(/&amp;/g, `&`)
          item2 = item2.replace(/&quot;/g, `"`)
        }
        return item
      })
      console.log(`shuffling answers...`)
      console.log('==================== Correct answers ====================')
      let index = 0
      for(item of questionsList) {
        item.index = index
        item.chosen = ''
        item.shuffledAnswers = item.incorrect_answers
        item.shuffledAnswers.push(item.correct_answer)
        let answers = item.shuffledAnswers
        // console.log(`Question`)
        // console.log(answers)
        if(answers.length === 4) {
          let j = Math.round(Math.random() * 3)
          if(j!==3) {
            [answers[3], answers[j]] = [answers[j], answers[3]]
          }
        } else {
          if(Math.round(Math.random()) === 1) {
            [answers[0], answers[1]] = [answers[1], answers[0]]
          }
        }
        console.log(index+1, item.correct_answer)
        index++
        item.shuffledAnswers = answers
        this.correctAnswers.push(item.correct_answer)
      }
      // console.log(questionsList)
      this.questions = questionsList
    })
    .catch(err => {
      console.log(err)
    })
  }
})