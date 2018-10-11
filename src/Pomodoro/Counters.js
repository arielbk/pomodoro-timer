import React from 'react';
import TimersContext from './TimersContext';
import './css/counters.css';

// displays pomodoros completed and pomodoro goal
export default function Counters() {
  return (
    <TimersContext.Consumer>
      {context => (
      <div className="counters">
        <div className="counter-pomodoros">{context.state.pomodoros}</div>
        <div className="counter-group">
          <div className="counter-goal">of <span>{context.state.goal}</span></div>
          <div className="counter-text">pomodoros<br /> completed</div>
        </div>
      </div>
      )}
    </TimersContext.Consumer>
  )
}