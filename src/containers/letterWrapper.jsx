/* eslint-disable linebreak-style */
// ^wtf is this rule...
import React from 'react';
import LetterSelector from '../components/letterSelector';
import AnswerViewer from '../components/answerViewer';

const LetterWrapper = ({
  answer, disp, letters, letterClicked,
}) => (
  <div className="letter-wrapper">
    <AnswerViewer
      answer={answer}
      disp={disp}
    />
    <span className="letter-wrapper__key">(USE KEYBOARD or PRESS BUTTON)</span>
    <LetterSelector
      letters={letters}
      disp={disp}
      letterClicked={letterClicked}
    />
  </div>
);

export default LetterWrapper;
