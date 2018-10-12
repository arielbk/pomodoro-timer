import React, { Component } from 'react';
import TimersContext from '../TimersContext';
import { SettingsItem, IncrementDecrement } from './index';

// settings component - set a pomodoro goal
export default class GoalSetter extends Component {
  render() {
    return (
      <TimersContext.Consumer>
        {context => (
          <SettingsItem>
            <IncrementDecrement 
              timer="work" 
              onMouseDown={() => context.handleGoalChange(-1)}
              >–</IncrementDecrement>
            <div>Goal : {context.state.goal}</div>
            <IncrementDecrement 
              timer="work" 
              onMouseDown={() => context.handleGoalChange(+1)}
              >+</IncrementDecrement>
          </SettingsItem>
        )}
      </TimersContext.Consumer>
    )
  }
}
