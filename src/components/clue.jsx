import React from 'react';

// props coming down include a clue string and a function that gets a newQuestion
const Clue = ({ clue, newQuestion }) => (
  <div className="clue">
    <h5 className="clue__title">CLUE</h5>
    {/* render the clue string */}
    {clue}

    {/*
      button that when clicked will get a new question and emit it to all other users via socketio
     */}
    <button className="new-question" type="button" onClick={newQuestion}>NEW QUESTION (PRESS ENTER)</button>
  </div>
);

export default Clue;
