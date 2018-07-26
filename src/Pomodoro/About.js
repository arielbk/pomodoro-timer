// a click outside of the about box should also close it...

import React, { Component } from 'react';

class About extends Component {
  render() {
    return (
      <div>
        <div className="about-toggle" onClick={this.props.onAboutToggle}>about</div>
        <div className="about-pomodoro" style={this.props.styles}>
          <p>The Pomodoro Technique is a time management method developed by Francesco Cirillo in the late 1980s.</p>
          <p>The technique uses a timer to break down work into intervals, traditionally 25 minutes in length, separated by short breaks.</p>
          <p>These intervals are named pomodoros, the plural in English of the Italian word pomodoro (tomato), after the tomato-shaped kitchen timer that Cirillo used as a university student.</p>
        <div className="close-btn-about" onClick={this.props.onAboutToggle}>✕</div>
        </div>
      </div>
    )
  }
}

export default About;