import React from 'react';
import { connect } from 'react-redux';
import LetterSelector from '../components/letterSelector';
import AnswerViewer from '../components/answerViewer';

const mapStateToProps = (state) => ({
  letters: state.hangman.letters,
});

const LetterWrapper = ({ letters, letterClicked }) => (
  <div className="letterWrapper">
    <AnswerViewer />
    <LetterSelector
      letters={letters}
      letterClicked={letterClicked}
    />
  </div>
);

export default connect(mapStateToProps)(LetterWrapper);
