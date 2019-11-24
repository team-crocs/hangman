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

// https://codeburst.io/isomorphic-web-app-react-js-express-socket-io-e2f03a469cd3

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
    // this.gameEnded = this.gameEnded.bind(this);
    this.letterClicked = this.letterClicked.bind(this);
    this.socket = io.connect('https://hangmanx-cs.herokuapp.com');
  }

  componentDidMount() {
    // destructure props
    const {
      updateLetter, updateDisplayAnswer, incrementFailedGuesses, newQuestionNoFetch,
    } = this.props;

    console.log('in comp did mount');
    this.socket.on('connect', (sock) => {
      console.log('connected to socket');

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
      this.socket.on('newQ', (question, answer) => {
        console.log('new question trigger');
        console.log('new question SOCKET triggered', question, answer);
        newQuestionNoFetch(question, answer);
      });
    });
    // get a new question (dispatch to props)
    // todo set socket.on for new question

    // todo change this to emit for a new question?
    // newQuestion();


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
    // if (String.toCharCode())
    // console.log('letter clicked was:', letter, letter.charCodeAt(0));
    this.socket.emit('newQ', 'random Q', 'random A');

    // const { newQuestion } = this.props;
    // only allow lower case letters, or ENTER for newQuestion
    if (letter === 'enter') {
      // console.log('new question clicked!');
      fetch('/newPrompt', {
        headers: {
          'Cache-Control': 'no-cache',
          'Content-Type': 'application/json',
        },
      })
        .then((res) => res.json())
        .then(({ question, answer }) => {
          console.log('--in fetch: question and answer', question, answer);

          // this.props.newQuestionNoFetch(question, answer);
          // console.log('props are', this.props);
          // console.log('socket obj is', this.socket);
          // console.log('this is', this);
          // todo emit to socketio with new question and answer?
          this.socket.emit('newQ', question, answer);
        })
        .catch((err) => console.log('FETCH ERRORRRRRR', err));
    } else if (letter.charCodeAt(0) >= 97 && letter.charCodeAt(0) <= 122) {
      console.log('letter clicked socket obj is', this.socket);
      this.socket.emit('clickedLetter', letter);
    }
  }

  render() {
    // console.log('props from redux', this.props.letters);

    // destructure props
    const {
      dbQuestion, dbAnswer, hangingPrompts, numberOfFailedGuesses, letters, displayAnswer,
      newQuestionNoFetch,
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
        {/* There's going to be an issue with newQUestion being passed down like this... */}
        <Clue clue={dbQuestion} newQuestion={newQuestionNoFetch} />
        <HangViewer
          hang={hangingPrompts}
          numFailedGuesses={numberOfFailedGuesses}
        />
      </div>
    );
  }
}

export default hot(module)(connect(mapStateToProps, mapDispatchToProps)(GameRoom));
