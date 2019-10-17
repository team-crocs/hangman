/* eslint-disable react/prop-types */
import React from 'react';

const Clue = ({ clue, newQuestion }) => (
  <div className="clue">
    <h5 className="clue__title">CLUE</h5>
    {clue}
    <button className="new-question" type="button" onClick={newQuestion}>NEW QUESTION (PRESS ENTER)</button>
  </div>
);

export default Clue;
