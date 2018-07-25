// this could be split into some sub-components
// play/pause button and circular progress bar component

import React, { Component } from 'react';

class ButtonProgress extends Component {
  constructor(props) {
    super(props);
    
    this.progressCircle = this.progressCircle.bind(this);
    this.handlePlayPause = this.handlePlayPause.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  handleKeyPress(e) {
    if (e.key === ' ') {
      this.handlePlayPause();
    } else if (e.key === 'Escape') {
      this.handleReset();
    }
  }

  componentDidMount() {
    this.circle = this.refs.circle.getContext('2d');

    this.startPoint = 4.72;

    this.cw = this.circle.canvas.width;
    this.ch = this.circle.canvas.height;

    // optimised animation
    requestAnimationFrame(this.progressCircle);

    document.addEventListener('keyup', this.handleKeyPress);
  }

  componentDidUnmount() {
    document.removeEventListener('keyup', this.handleKeyPress);
  }

  componentDidUpdate(){
    requestAnimationFrame(this.progressCircle);
  }

  // --------------------------------------------------------------------------
  //                                           play/pause timer
  // --------------------------------------------------------------------------

  handlePlayPause() {
    let timer = this.props.activeTimer;

    // pause or play the timer depending on current state
    if (timer.paused) {
      timer.untilTime = Date.now() + this.props.activeTimer.timeRemaining * 1000;
      timer.intervalID = setInterval(() => this.props.timerFunc(), 1000);
      this.props.changeState({ activeTimer: timer });
    } else {
      clearInterval(timer.intervalID);
    }

    timer.paused = !timer.paused;

    this.props.changeState({activeTimer: timer})
  }

  // --------------------------------------------------------------------------
  //                                           handle reset
  // --------------------------------------------------------------------------

  // default back to work timer
  handleReset() {
    const activeTimer = {...this.props.activeTimer};

    // end any running timer function
    clearInterval(activeTimer.intervalID);

    const duration = this.props.work.duration;
    
    activeTimer.name = 'work';
    activeTimer.timeRemaining = duration;
    activeTimer.paused = true;

    this.props.changeState({ activeTimer });
  }

  progressCircle() {
    const timerName = this.props.activeTimer.name;
    const duration = this.props[timerName].duration;
    const timeRemaining = this.props.activeTimer.timeRemaining;
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
      <div className="reset-button" onClick={this.handleReset}>✕</div>
      <div 
        className="button-progress"
        style={this.props.styles.background}
      >
        <div className="button-progress-inner">
          <i className={this.props.activeTimer.paused ? 'fas fa-play' : 'fas fa-pause'} style={this.props.styles.font}></i>
        </div>
      </div>
      <canvas height="152" width="152" ref="circle" className="progress-canvas" onClick={this.handlePlayPause}/>
    </div>
    );
  }
}

export default ButtonProgress;