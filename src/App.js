import React, { Component } from 'react';
import axios from 'axios';

const endpoint = 'https://api.chucknorris.io/jokes/random?category=dev';

// function in charge of performing our API call
const getSentences = url => fetch(url).then(res => res.json())

// same fn but with axios
const getSentencesWithAxios = url => axios(url)


class App extends Component {

  state = {
    showLandingPage: true,
    sentence1: '',
    sentence2: '',
    winner: ''
  }
  // a method to switch between the landing page and the sentence section
  showFacts = () => {
    this.setState({
      showLandingPage: false
    })
  }

  // If we need 2 promises, we can just call 2 times the fetch method
  // componentDidMount() {
  //   fetch('https://api.chucknorris.io/jokes/random')
  //     .then(response => response.json())
  //     .then(data => this.setState({
  //       sentence1: data.value
  //     }))
  //   fetch('https://api.chucknorris.io/jokes/random')
  //     .then(response => response.json())
  //     .then(data => this.setState({
  //       sentence2: data.value
  //     }))
  // }

  // Option where we concatenate a promise inside of another promise
  // componentDidMount() {
  //   fetch('https://api.chucknorris.io/jokes/random')
  //     .then(response => response.json())
  //     .then(data1 =>
  //       fetch('https://api.chucknorris.io/jokes/random')
  //         .then(response => response.json())
  //         .then(data2 => this.setState({
  //           sentence1: data1.value,
  //           sentence2: data2.value
  //         }))
  //     )
  // }

  // We can use Promise.all() method in order to return an array of promises, all promises will be fulfilled and we will wait till they are ready to treat them
  storeSentences = () => (
    Promise.all([getSentences(endpoint), getSentences(endpoint)])
      .then(data =>
        this.setState({
          sentence1: data[0].value,
          sentence2: data[1].value,
          winner: ''
        })
      )
  )

  // Same approach with axios. You don't need the .json() method here
  // storeSentences = () => (
  //   Promise.all([getSentencesWithAxios(endpoint), getSentencesWithAxios(endpoint)])
  //     .then(dataFromAxios =>
  //       this.setState({
  //         sentence1: dataFromAxios[0].data.value,
  //         sentence2: dataFromAxios[1].data.value,
  //         winner: ''
  //       })
  //     )
  // )

  // we call the method that does the api call when the component is mounted
  componentDidMount() {
    this.storeSentences()
  }

  // we select which sentence will be the winner based on what parameter the fn sends
  chooseSentence = sentence =>
    this.setState({
      winner: this.state[sentence]
    })

  render() {
    return (
      <>
        {
          this.state.showLandingPage
            ? // SHOW LANDING
            <>
              <h1>Chuck Facts</h1>
              <p>Bacon ipsum dolor amet pork strip steak fatback burgdoggen. Pork belly jowl andouille bresaola sausage beef ribs flank filet mignon cupim pastrami turducken beef tri-tip drumstick. Shoulder pastrami chicken tongue prosciutto strip steak. Frankfurter boudin shank capicola meatball cow.</p>

              <p>Cow boudin ham hock cupim pancetta, shankle spare ribs biltong doner tongue. Salami meatball pork loin pastrami capicola leberkas beef ribs tongue shankle jowl ground round burgdoggen beef cow short loin. Buffalo ball tip meatloaf, tenderloin andouille jerky flank. Meatball swine boudin beef tenderloin sirloin ball tip ham hock leberkas. Spare ribs tongue chislic t-bone. T-bone beef ribs andouille, capicola shankle swine bacon filet mignon alcatra. Pork andouille meatball, sausage jerky porchetta t-bone swine spare ribs beef jowl cupim frankfurter.</p>

              <p>Chicken pork belly turducken burgdoggen pork ham. Chicken filet mignon sausage shoulder turducken biltong. Boudin rump leberkas shoulder, pork sirloin andouille salami sausage short loin porchetta. Tongue short ribs turkey, picanha tri-tip spare ribs burgdoggen drumstick short loin shank t-bone pancetta.</p>

              <button onClick={this.showFacts}>Give me those facts</button>
            </>

            : // SHOW FACTS
            <>
              <p>{this.state.sentence1}<button onClick={() => this.chooseSentence('sentence1')}>Choose it</button></p>
              <p>{this.state.sentence2}<button onClick={() => this.chooseSentence('sentence2')}>Choose it</button></p>
              {
                this.state.winner &&
                <>
                  <h2>The funniest joke: {this.state.winner}</h2>
                  <button onClick={this.storeSentences}>Give me more</button>
                </>
              }
            </>
        }
      </>
    )
  }
}

export default App;
