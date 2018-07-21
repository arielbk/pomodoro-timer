import React, { Component } from 'react';

// displays the timer's current time formatted
class ShowTime extends Component {

  // --------------------------------------------------------------------------
  //                                           updateTimeShown
  // --------------------------------------------------------------------------

  // take in seconds and return minutes and seconds
  updateTimeShown(duration) { // in seconds (for now)
    let mins = Math.floor((duration/60));
    if (mins < 10) mins = `0${mins}`; // prepend 0 if < 10
    let secs = Math.floor(duration%60);
    if (secs < 10) secs = `0${secs}`; // prepend 0 if < 10
    this.setState({ showTime: {
      mins,
      secs,
      msecs: '000',
    }});
    document.title = `${mins}:${secs} - pomodoro timer`;
  }

  render() {
    return (
    <div className="show-time">
      <div className="minutes" style={this.props.font}>{this.props.time.mins}</div>
      <div className="seconds-group">
        <div className="seconds">{this.props.time.secs}</div>
        <div className="milliseconds">{this.props.time.msecs}</div>
      </div>
    </div>
  )}
}

export default ShowTime;