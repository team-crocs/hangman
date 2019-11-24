/* eslint-disable react/prop-types */
import React from 'react';

const AnswerViewer = ({ disp }) => {
  // console.log('answer viewer props', props);

  // generate our array of string characters
  const dispCharArray = [];
  for (let i = 0; i < disp.length; i += 1) {
    dispCharArray.push(
      <span
        className="letter__item"
        key={i}
      >
        {`${disp[i]} `}
      </span>,
    );
  }

  return (
    <div className="letter__list">
      {dispCharArray}
    </div>
  );
};


export default AnswerViewer;
