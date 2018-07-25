import React, { Component } from 'react';

// settings component - set a time
class TimeSetter extends Component {
  constructor(props) {
    super(props);
    this.handleDurationChange = this.handleDurationChange.bind(this);
  }
  handleDurationChange(timer, change) {

    // clone timer and return if new duration is inappropriate
    timer = {...this.props.timer}
    timer.duration = timer.duration + change * 60;
    if (timer.duration < 0 || timer.duration > 5940) return; // 0 < timer < 99 minutes

    // time is added to active running timers to adjust
    const activeTimer = this.props.activeTimer;
    if (timer.name === activeTimer.name) {
      activeTimer.timeRemaining += change * 60;
    }

    // set state
    this.props.changeState({ [timer.name]: timer, activeTimer })

    // recurse the function if mouse click is held
    setTimeout(() => {
      // although this forces a new timer everytime the function is run
      if (this.props.mouseDown) this.handleDurationChange(timer.name, change);
    }, 100);

  }

  render() {
    let timerName;
    this.props.timer.name === 'longBreak'
      ? timerName = 'long-break'
      : timerName = this.props.timer.name;
    return (
      <div className={`settings-item settings-timer-${timerName}`} >
        <a className='decrement noselect' onMouseDown={() => this.handleDurationChange(this.props.timer.name, -1)}>–</a>
        <div className='settings-timer-show'>{Math.floor(this.props.timer.duration / 60)} min</div>
        <a className='increment noselect' onMouseDown={() => this.handleDurationChange(this.props.timer.name, +1 )}>+</a>
      </div>
    );
  }
}

export default TimeSetter;