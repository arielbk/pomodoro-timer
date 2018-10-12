import React, { Component } from 'react';
import TimersContext from '../TimersContext';
import { SettingsItem, IncrementDecrement } from './index';

// settings component - set a time
export default class TimeSetter extends Component {
  render() {
    return (
      <TimersContext.Consumer>
        {context => (
          <SettingsItem>
            <IncrementDecrement 
              timer={this.props.timerName} 
              onMouseDown={() => context.handleDurationChange(-1)}>
              –
            </IncrementDecrement>
              
              <div>{Math.floor(context.state[this.props.timerName].duration / 60 / 1000)} min</div>
            
            <IncrementDecrement 
              timer={this.props.timerName} 
              onMouseDown={() => context.handleDurationChange(+1)}>
              +
            </IncrementDecrement>
          </SettingsItem>
        )}
      </TimersContext.Consumer>
    );
  }
}