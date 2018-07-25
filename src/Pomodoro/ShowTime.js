import React, { Component } from 'react';

// displays the timer's current time formatted
class ShowTime extends Component {
  render() {
    const timeRemaining = this.props.timeRemaining;

    let mins = Math.floor((timeRemaining/60));
    if (mins < 10) mins = `0${mins}`; // prepend 0 if < 10

    let secs = Math.floor(timeRemaining%60);
    if (secs < 10) secs = `0${secs}`; // prepend 0 if < 10

    document.title = `${mins}:${secs} - pomodoro timer`;
    return (
    <div className="show-time">
      <div className="minutes" style={this.props.font}>{mins}</div>
      <div className="seconds-group">
        <div className="seconds">{secs}</div>
        <div className="milliseconds">000</div>
      </div>
    </div>
  )}
}

export default ShowTime;