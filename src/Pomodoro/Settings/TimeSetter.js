import React, { Component } from 'react';
import TimersContext from '../TimersContext';

// settings component - set a time
export default class TimeSetter extends Component {
  render() {
    return (
      <TimersContext.Consumer>
        {context => (
          <div className={`settings-item settings-timer-${this.props.timerName}`} >
            <a className='decrement noselect' onMouseDown={() => context.handleDurationChange(-1)}>–</a>
            <div className='settings-timer-show'>{Math.floor(context.state[this.props.timerName].duration / 60 / 1000)} min</div>
            <a className='increment noselect' onMouseDown={() => context.handleDurationChange(+1)}>+</a>
          </div>
        )}
      </TimersContext.Consumer>
    );
  }
}