new Vue({
  el: '#app',
  data: {
    message: 'Hello world-nya phase 2',
    isLoggedIn: false,
    questions: []
  },
  methods: {

  },
  created() {
    axios.get('https://opentdb.com/api.php?amount=10')
    .then(({data}) => {
      console.log(data.results)
    })
    .catch(err => {
      console.log(err)
    })
  }
})