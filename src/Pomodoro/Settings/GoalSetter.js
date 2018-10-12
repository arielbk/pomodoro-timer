import React, { Component } from 'react';
import TimersContext from '../TimersContext';
import styled from 'styled-components';
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
            <div className='settings-goal-show'>Goal : {context.state.goal}</div>
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
