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
          <p>Work for one 'pomodoro' (one set interval — usually 25 minutes) and then have a short break. After 4 of these, go and have a long break. It's stupidly simple, but extremely effective for focus and productivity.</p>
          <p>Have you ever felt like you have so much to do that it is overwhelming, and you actually end up procrastinating? Set the timer for 25 minutes, and just begin. After all, its only 25 minutes!</p>
          <p>Break your work up into intensely focused and proactive bursts. Go have a glass of water. Have a stretch. Jump around. Stare out the window. Then dive back in.</p>
          <p>The Pomodoro Technique has been around since the 1980s, and was developed by Francesco Cirillo. Find out more about it on the <a href="https://en.wikipedia.org/wiki/Pomodoro_Technique">Wikipedia page</a>.</p>
        <div className="close-btn-about" onClick={this.props.onAboutToggle}>✕</div>
        </div>
      </div>
    )
  }
}

export default About;