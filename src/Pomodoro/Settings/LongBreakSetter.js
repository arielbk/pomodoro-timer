import React, { Component } from 'react';
import TimersContext from '../TimersContext';
import { SettingsItem, IncrementDecrement } from './index';

// settings component - set a pomodoro goal
export default class LongBreakSetter extends Component {
  render() {
    return (
      <TimersContext>
        {context => (
          <SettingsItem>
            <IncrementDecrement
              timer="longBreak"
              onMouseDown={() => context.handleSetChange(-1)}
              >–</IncrementDecrement>
            <div>Every {context.state.pomodoroSet}</div>
            <IncrementDecrement 
              timer="longBreak"
              onMouseDown={() => context.handleSetChange(+1)}
              >+</IncrementDecrement>
          </SettingsItem>
        )}
      </TimersContext>
  )}
}