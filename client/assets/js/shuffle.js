function shuffle(answers) {
  if(answers.length === 4) {
    for (let i = answers.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i
      [answers[i], answers[j]] = [answers[j], answers[i]]; // swap elements
    }
    console.log(answers)
    return answers
  } else {
    if(Math.round(Math.random()) === 1) {
      [answers[0], answers[1]] = [answers[1], answers[0]]
    }
    return answers
  }
}
