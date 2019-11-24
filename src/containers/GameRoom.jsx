/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import io from 'socket.io-client';
import { connect } from 'react-redux';
import LetterWrapper from './letterWrapper';
import Clue from '../components/clue';
import HangViewer from '../components/hangViewer';
import HangingDude from '../components/HangingDude';

// import * as types from '../constants/actionTypes';
import * as actions from '../actions/actions';

const mapStateToProps = (state) => ({
  letters: state.hangman.letters,
  dbAnswer: state.hangman.dbAnswer,
  dbQuestion: state.hangman.dbQuestion,
  displayAnswer: state.hangman.displayAnswer,
  hangingPrompts: state.hangman.hangingPrompts,
  numberOfFailedGuesses: state.hangman.numberOfFailedGuesses,
});


const mapDispatchToProps = (dispatch) => ({
  updateLetter(letter) {
    dispatch(actions.updateLetter(letter));
  },
  updateDisplayAnswer(letter) {
    dispatch(actions.updateDisplayAnswer(letter));
  },
  incrementFailedGuesses() {
    dispatch(actions.incrementFailedGuesses());
  },
  checkWin() {
    dispatch(actions.checkWin());
  },
  newQuestionNoFetch(question, answer) {
    console.log('in map dispatch no fetch', question, answer);
    dispatch(actions.newQuestionNoFetch(question, answer));
  },
});

class GameRoom extends Component {
  constructor(props) {
    super(props);
    this.letterClicked = this.letterClicked.bind(this);
    this.newQuestion = this.newQuestion.bind(this);

    // TODO to AWS
    this.socket = io.connect('http://localhost:3000');
  }

  componentDidMount() {
    // destructure props
    const {
      updateLetter, updateDisplayAnswer, incrementFailedGuesses, newQuestionNoFetch,
    } = this.props;

    // create socket listener for clicked letter
    this.socket.on('clickedLetter', (letter) => {
      console.log('clickedletteris ', letter);
      // call dispatch to update letters in store/state
      updateLetter(letter);
      // console.log('letter and dbAnswer in GameRoom comp', letter, dbAnswer);
      // check if answer in state has the letter
      // eslint-disable-next-line react/destructuring-assignment
      if (this.props.dbAnswer.includes(letter)) {
        // call dispatch to update the display answer
        updateDisplayAnswer(letter);
      } else {
        // this.setState({ numFailedGuesses: this.state.numFailedGuesses + 1 });
        incrementFailedGuesses();
      }
    });

    this.socket.on('newQuestion', (question, answer) => {
      console.log('new question SOCKET triggered', question, answer);
      newQuestionNoFetch(question, answer);
    });

    this.newQuestion();

    // single line of code to handle keypresses (sends to letterClicked method)
    document.addEventListener('keypress', (e) => this.letterClicked(e.key.toLowerCase()));
  }

  componentDidUpdate() {
    const { checkWin } = this.props;
    checkWin();
  }

  // this probably isn't doing it's job because the event listener function
  // in Comp Did Mount is anonymous https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/removeEventListener
  componentWillUnmount() {
    document.removeEventListener('keypress', (e) => this.letterClicked(e.key.toLowerCase()));
  }

  // change state when letter is selected
  letterClicked(letter) {
    // console.log('letter clicked was:', letter, letter.charCodeAt(0));

    // const { newQuestion } = this.props;
    // only allow lower case letters, or ENTER for newQuestion
    if (letter === 'enter') {
      // console.log('new question clicked!');
      this.newQuestion();
    } else if (letter.charCodeAt(0) >= 97 && letter.charCodeAt(0) <= 122) {
      this.socket.emit('clickedLetter', letter);
    }
  }

  async newQuestion() {
    const qAndA = await fetch('/newPrompt', {
      headers: {
        'Cache-Control': 'no-cache',
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((json) => json)
      .catch((err) => console.log('FETCH ERRORRRRRR', err));


    const { question, answer } = qAndA;
    this.socket.emit('newQuestion', question, answer);
  }

  render() {
    // destructure props
    const {
      dbQuestion, dbAnswer, hangingPrompts, numberOfFailedGuesses, letters, displayAnswer,
    } = this.props;

    // return all the things and stuff to render
    return (
      <div className="App">
        <header className="splash__header">
          <h1 className="splash__title">SocketMan</h1>
          <span className="splash__version">x2</span>
        </header>
        <HangingDude numberOfFailedGuesses={numberOfFailedGuesses} />
        <LetterWrapper
          letters={letters}
          letterClicked={this.letterClicked}
          answer={dbAnswer}
          disp={displayAnswer}
        />
        <Clue clue={dbQuestion} newQuestion={this.newQuestion} />
        <HangViewer
          hang={hangingPrompts}
          numFailedGuesses={numberOfFailedGuesses}
        />
      </div>
    );
  }
}

export default hot(module)(connect(mapStateToProps, mapDispatchToProps)(GameRoom));
