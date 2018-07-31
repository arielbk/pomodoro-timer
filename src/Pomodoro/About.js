// a click outside of the about box should also close it...

import React, { Component } from 'react';
import './css/about.css';

class About extends Component {
  render() {
    return (
      <div>
        <div className="about-toggle" onClick={this.props.onAboutToggle}>about</div>
        <div className="about-pomodoro" style={this.props.styles}>
          <p>The Pomodoro Technique is a tool for time management and productivity.</p>
          <p>Work for one 'pomodoro' (one set interval — usually 25 minutes) and then have a short break. After 4 of these, go and have a long break. It's simple and effective for flow, focus and productivity.</p>
          <p>The Pomodoro Technique has been around since the 1980s, and was developed by Francesco Cirillo. Find out more about it on the <a href="https://en.wikipedia.org/wiki/Pomodoro_Technique">Wikipedia page</a>.</p>
        <div className="close-btn-about" onClick={this.props.onAboutToggle}>✕</div>
        </div>
      </div>
    )
  }
}

export default About;