import React, { Component } from 'react';
import TimersContext from './TimersContext';
import './css/showTime.css';

// displays the timer's current time formatted
class ShowTime extends Component {
  render() {
    const timeRemaining = 
      this.props.context.state.activeTimer.timeRemaining;

    let mins = Math.floor((timeRemaining/1000)/60);
    if (mins < 10) mins = `0${mins}`; // prepend 0 if < 10

    let secs = Math.floor((timeRemaining/1000)%60);
    if (secs < 10) secs = `0${secs}`; // prepend 0 if < 10

    let msecs = Math.floor(timeRemaining % 1000);
    if (msecs < 10) {
      msecs = `00${msecs}`;
    } else if (msecs < 100) {
      msecs = `0${msecs}`;
    }

    document.title = `${mins}:${secs} - pomodoro timer`;
    return (
    <div className="show-time">
      <div className="minutes" style={this.props.font}>{mins}</div>
      <div className="seconds-group">
        <div className="seconds">{secs}</div>
        <div className="milliseconds">{msecs}</div>
      </div>
    </div>
  )}
}

const WithContext = () => (
  <TimersContext.Consumer>
    {context => <ShowTime context={context} />}
  </TimersContext.Consumer>
)

export default WithContext;