const baseUrl = 'http://localhost:3000/'

let app = new Vue({
  el: '#app',
  data: {
    message: 'Hello world-nya phase 2',
    isLoggedIn: false,
    questions: [],
    email:'',
    password:'',
    file:null,
    currentPage : '',
    currentEmail:'',
    currentImage:''
  },
  methods: {
    loginUser() {
      axios.post(baseUrl + 'users/login',{
        email : this.email,
        password : this.password
      })
        .then(({data}) => {
          localStorage.setItem('token', data.token)
          localStorage.setItem('email', data.email)
          localStorage.setItem('image', data.image)
          this.currentEmail = localStorage.getItem('email')
          this.currentImage = localStorage.getItem('image')
          this.isLoggedIn = true
        })
        .catch(err => {
          console.log(err)
        })
    },
    checkLogin() {
      if(localStorage.getItem('token')) {
        this.isLoggedIn = true
        this.currentEmail = localStorage.getItem('email')
        this.currentImage = localStorage.getItem('image')
      }
    },
    fetchQuiz() {
      axios.get(`${baseUrl}quiz/`)
      .then(({data}) => {
        console.log(data)
      })
      .catch(err => {
        console.log(err)
      })
    },
    logout() {
      this.isLoggedIn = false
      localStorage.removeItem('token')
      localStorage.removeItem('email')
    },
    uploadImage(event) {
      this.file = event.target.files[0]
    },
    changeImage() {
      const fd = new FormData()
      fd.append('image', this.file, this.file.name)
      axios.post(baseUrl + 'google/upload', fd,{
        headers : {
          token : localStorage.getItem('token')
        }
      })
        .then(({data})=> {
          localStorage.setItem('image', data.gcsLink)
          this.currentImage = data.gcsLink
        })
        .catch(err => {
          console.log(err)
        })
      
    }

  },
  created() {
    this.fetchQuiz()
    this.checkLogin()
    this.currentPage = ''
  }
})
