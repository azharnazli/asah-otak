Vue.component('questionscomponent', {
  props: ['questions'],
  data() {
    return {
      answers: {
        0: '',
        1: '',
        2: '',
        3: '',
        4: '',
        5: '',
        6: '',
        7: '',
        8: '',
        9: '',
      },
    };
  },
  methods: {
    submission() {
      // console.log('answers')
      // console.log(this.answers)
      this.$emit('submit-questions', this.answers)
    }
  },
  template: `
  <form v-on:submit.prevent="submission">
    <div v-for="(item, index) in questions" v-bind:item="item">
      <h3>{{item.question}}</h3>
      <div style="margin-left: 30px;">
        <div v-for="(shuffledAnswer, shuffledAnswerIndex) in item.shuffledAnswers">
          <input type="radio" v-bind:name="item.index" v-bind:value="shuffledAnswer" v-model="answers[index]"> {{shuffledAnswer}}<br>
        </div>
      </div>
      <br>
    </div>
    <button class="btn btn-primary" type="submit" >Submit</button>
    <button class="btn btn-warning float-right" type="submit" v-on:click.prevent="currentPage = ''" >Back</button>
  </form>
  `
})


// <form><input type="radio" name="answer" value="0"> {{item.correct_answer}}</form>