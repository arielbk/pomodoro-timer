import React, { Component } from 'react';
import TimersContext from '../TimersContext';

// settings component - set a pomodoro goal
export default class GoalSetter extends Component {
  render() {
    return (
      <TimersContext.Consumer>
        {context => (
          <div className='settings-item settings-goal'>
              <a className='decrement noselect' onMouseDown={() => context.handleGoalChange(-1)}>–</a>
              <div className='settings-goal-show'>Goal : {context.state.goal}</div>
              <a className='increment noselect' onMouseDown={() => context.handleGoalChange(+1)}>+</a>
            </div>
        )}
      </TimersContext.Consumer>
    )
  }
}
