import React, { Component } from 'react';

// play/pause button and circular progress bar component
class ButtonProgress extends Component {
  constructor(props) {
    super(props);
    
    this.progressCircle = this.progressCircle.bind(this);
  }

  componentDidMount() {
    this.circle = this.refs.circle.getContext('2d');

    this.startPoint = 4.72;

    this.cw = this.circle.canvas.width;
    this.ch = this.circle.canvas.height;

    requestAnimationFrame(this.progressCircle);
  }

  componentDidUpdate(){
    requestAnimationFrame(this.progressCircle);
  }

  // --------------------------------------------------------------------------
  //                                           play/pause timer
  // --------------------------------------------------------------------------

  handlePlayPause() {
    // clone active timer
    let timer;
    if (this.state.longBreakTime) {
      timer = this.timerClone('longBreak');
    } else if (this.state.workTime) {
      timer = this.timerClone('work')     
    } else {
      timer = this.timerClone('break');
    }

    // if this is a fresh timer, set its remaining time to input value
    if (!timer.started) {
      timer.timeRemaining = timer.duration;
    }

    // pause or play the timer depending on current state
    if (timer.timing) { // pause the timer
      clearInterval(this.state.intervalID);
    } else { // run the timer and set new intervalID
      this.setState({ intervalID: setInterval(() => this.timerFunc(), 1000) });
    }

    // timer has now changed, toggle whether it is active or paused
    timer.started = true;
    timer.timing = !timer.timing;

    // icon to change
    let playPauseIcon = {...this.state.playPauseIcon};
    timer.timing
      ? playPauseIcon = 'fas fa-pause'
      : playPauseIcon = 'fas fa-play';

    if (this.state.longBreakTime) {
      this.setState({ longBreak: timer, playPauseIcon }) 
    } else if (this.state.workTime) {
      this.setState({ work: timer, playPauseIcon })     
    } else {
      this.setState({ break: timer, playPauseIcon });
    }
  }

  // --------------------------------------------------------------------------
  //                                           handle reset
  // --------------------------------------------------------------------------

  // reset all state, if button is pressed then revert to work timer
  handleReset(resetButton = false) { // normal reset by default

    // end any running timer function
    clearInterval(this.state.intervalID);

    // if this reset is from the button, revert to work timer...
    if (resetButton) {
      const styles = JSON.parse(JSON.stringify(this.state.styles));

      styles.title = {
        workTitle: {
          color: 'var(--lightred)',
          borderBottom: '6px solid var(--lightred)'
        },
        breakTitle: { color: '', borderBottom: '' },
        longBreakTitle: { color: '', borderBottom: ''},
      }

      // icon to change
      const playPauseIcon = 'fas fa-play';
      
      styles.font.color = 'var(--lightred)';
      // styles.playPause.color = 'var(--lightgreen)';
      styles.background.background = 'var(--darkred)'

      this.setState({ workTime: true, styles, playPauseIcon });
    }

    const workTimer = {...this.state.work};
    const breakTimer = {...this.state.break};
    const longBreakTimer = {...this.state.longBreak};
    

    // reset all values
    workTimer.timeRemaining = workTimer.duration;
    workTimer.started = false;
    workTimer.timing = false;

    breakTimer.timeRemaining = breakTimer.duration;
    breakTimer.started = false;
    breakTimer.timing = false;
    
    longBreakTimer.timeRemaining = longBreakTimer.duration;
    longBreakTimer.started = false;
    longBreakTimer.timing = false;

    this.updateTimeShown(workTimer.timeRemaining);

    this.setState({ work: workTimer, break: breakTimer, longBreak: longBreakTimer, longBreakTime: false, progressPercent: 0, });
  }

  progressCircle() {

    let endPoint = ((this.props.progressPercent/100) * Math.PI * 2);

    this.circle.clearRect(0,0,this.cw,this.ch); // clear canvas every time function is called

    this.circle.lineWidth = 22; // stroke size
    if (this.props.workTime) {
      this.circle.strokeStyle = '#cf4547';
    } else if (!this.props.WorkTime && this.props.longBreakTime) {
      this.circle.strokeStyle = '#8df37a';
    } else {
      this.circle.strokeStyle = '#d1802a';
    }

    this.circle.beginPath();
    this.circle.arc(76,76,65,this.startPoint,endPoint+this.startPoint); // x, y, radius, start, end

    this.circle.stroke(); // fill stroke
  }

  render() {
      return (
    <div className="buttons-container">  
      <div className="reset-button" onClick={this.props.onReset}>✕</div>
      <div 
        className="button-progress"
        onClick={this.props.handleClick}
        style={this.props.backgroundColor}
      >
        <div className="button-progress-inner" style={this.props.fontColor}>
          <i className={this.props.faIcon} style={this.props.playPauseColor}></i>
        </div>
      </div>
      <canvas height="152" width="152" ref="circle" className="progress-canvas" onClick={this.props.handleClick} />
    </div>
    );
  }
}

export default ButtonProgress;