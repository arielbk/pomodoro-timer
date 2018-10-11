import React, { Component } from 'react';
import TimersContext from '../TimersContext';

// settings component - set a pomodoro goal
export default class LongBreakSetter extends Component {
  render() {
    return (
      <TimersContext>
        {context => (
          <div className='settings-item settings-lb-set' >
            <a className='decrement noselect' onMouseDown={() => context.handleSetChange(-1)}>–</a>
            <div className='settings-goal-show'>Every {context.pomodoroSet}</div>
            <a className='increment noselect' onMouseDown={() => context.handleSetChange(+1)}>+</a>
          </div>
        )}
      </TimersContext>
  )}
}