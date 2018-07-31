import React from 'react';
import './css/counters.css';

// displays pomodoros completed and pomodoro goal
function Counters(props) {
  return (
    <div className="counters">
      <div className="counter-pomodoros">{props.pomodoros}</div>
      <div className="counter-group">
        <div className="counter-goal">of <span editable="true">{props.goal}</span></div>
        <div className="counter-text">pomodoros<br /> completed</div>
      </div>
    </div>
  )
}

export default Counters;