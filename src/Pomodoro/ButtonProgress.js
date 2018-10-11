// This component is passed state via a Context HOC (bottom)
// Context is accessed via props
// This should be a common HOC for reuse, still haven't figured it out completely
// And this still seems relatively clean...

import React, { Component } from 'react';
import './css/buttonProgress.css';
import TimersContext from './TimersContext';

class ButtonProgress extends Component {
  handleKeyPress = (e) => {
    if (e.key === ' ') {
      this.props.context.handlePlayPause();
    } else if (e.key === 'Escape') {
      this.props.context.handleReset();
    }
  }

  componentDidMount = () => {
    this.circle = this.refs.circle.getContext('2d');
    this.startPoint = 4.72;
    this.cw = this.circle.canvas.width;
    this.ch = this.circle.canvas.height;
    // optimised animation
    requestAnimationFrame(this.progressCircle);

    document.addEventListener('keyup', this.props.context.handleKeyPress);
  }

  componentWillUnmount = () => {
    document.removeEventListener('keyup', this.props.context.handleKeyPress);
  }

  componentDidUpdate = () => {
    requestAnimationFrame(this.progressCircle);
  }

  progressCircle = () => {
    const activeTimer = this.props.context.state.activeTimer;
    const timerName = activeTimer.name;
    const duration = activeTimer.duration;
    const timeRemaining = activeTimer.timeRemaining;
    const progress = (duration - timeRemaining) / duration;

    let endPoint = ((progress) * Math.PI * 2);
    this.circle.clearRect(0,0,this.cw,this.ch); // clear canvas every time function is called

    this.circle.lineWidth = 22; // stroke size
    if (timerName === 'work') {
      this.circle.strokeStyle = '#cf4547'; // var(--lightred)
    } else if (timerName === 'break') {
      this.circle.strokeStyle = '#e2d34e'; // var(--lightorange)
    } else if (timerName === 'longBreak') {
      this.circle.strokeStyle = '#8df37a'; // var(--lightgreen)
    }

    this.circle.beginPath();
    this.circle.arc(76,76,65,this.startPoint,endPoint+this.startPoint); // x, y, radius, start, end

    this.circle.stroke(); // fill stroke
  }

  render() {
      return (
      <div className="buttons-container">  
        <div className="reset-button noselect" onClick={this.props.context.handleReset}>✕</div>
        <div 
          className="button-progress"
        >
          <div className="button-progress-inner">
            <i className={this.props.context.state.activeTimer.paused ? 'fas fa-play' : 'fas fa-pause'}></i>
          </div>
        </div>
        <canvas height="152" width="152" ref="circle" className="progress-canvas" onClick={this.props.context.handlePlayPause}/>
      </div>
    );
  }
}

const WithContext = () => (
  <TimersContext.Consumer>
    {context => <ButtonProgress context={context} />}
  </TimersContext.Consumer>
)

export default WithContext;