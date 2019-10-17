import React from 'react';

const LetterSelector = ({ letters, letterClicked }) => {
  const letterObj = letters;
  const letterArr = Object.keys(letterObj);

  // generate buttons for each letter
  const letterButtonArr = [];
  for (let i = 0; i < letterArr.length; i += 1) {
    letterButtonArr.push(
      <button
        type="button"
        key={`${letterArr[i]}_button`}
        className="letter__button-item"
        disabled={letterObj[letterArr[i]] ? 'disabled' : null}
        onClick={
          () => {
            // console.log(letterArr[i]);
            letterClicked(letterArr[i]);
          }
        }
      >
        {letterArr[i]}
      </button>,
    );
  }

  // function keyPressed(event) {
  //   console.log('keypress', event.key);
  // }

  return (
    <div className="letter__buttons">
      {letterButtonArr}
    </div>
  );
};


export default LetterSelector;
