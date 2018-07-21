import React, { Component } from 'react';

// settings component - set a time
class TimeSetter extends Component {
  render() {
    let timerName;
    this.props.timer.name === 'longBreak'
      ? timerName = 'long-break'
      : timerName = this.props.timer.name;
    return (
      <div className={`settings-item settings-timer-${timerName}`} >
        <a className='decrement noselect' onMouseDown={() => this.props.onDurationChange(this.props.timer.name, -1)}>–</a>
        <div className='settings-timer-show'>{Math.floor(this.props.timer.duration / 60)} min</div>
        <a className='increment noselect' onMouseDown={() => this.props.onDurationChange(this.props.timer.name, +1 )}>+</a>
      </div>
    );
  }
}

//  settings component - select a sound
function SoundSelector(props) {

  return (
    <div className={`settings-item settings-sound settings-sound-${props.timer.name}`} >
      <a className='sound-prev-arrow noselect' onMouseDown={() => {
        let newIndex = props.sounds.indexOf(props.activeSound);

        if (newIndex < 1 ) { newIndex = props.sounds.length-1; }
        else { newIndex-- }

        props.onSoundSelect(props.timer.name, props.sounds[newIndex]);
      }}>◀</a>
        <ul className='sound-list'>
          {props.sounds.map(sound => {
            return <li key={`sound-${props.timer.name}-${sound}`} className={sound === props.activeSound ? 'sound-active' : 'sound-hidden'}><span className='sound-icon' onClick={() => props.onSampleSound(props.timer.name)}><i className="fas fa-volume-up"></i></span> {sound}</li>
          })}
        </ul>
      <a className='sound-next-arrow noselect' onMouseDown={() => {
        let newIndex = props.sounds.indexOf(props.activeSound);

        if (newIndex === props.sounds.length - 1 ) { newIndex = 0; }
        else { newIndex++ }

        props.onSoundSelect(props.timer.name, props.sounds[newIndex]);
      }}>►</a>
      <div className='sound-progress'>
        {props.sounds.map((sound, index) => {
          return <div onClick={() => props.onSoundSelect(props.timer.name, props.sounds[index])} key={`sound-tab-${props.timer.name}-${sound}`} className={sound === props.activeSound ? 'sound-progress-tab sound-progress-tab-active' : 'sound-progress-tab'}></div>
        })}
      </div>
    </div>
  )
}

// settings component - set a pomodoro goal
function GoalSetter(props) {
  return (
    <div className='settings-item settings-goal'>
        <a className='decrement noselect' onMouseDown={() => props.onGoalChange(-1)}>–</a>
        <div className='settings-goal-show'>Goal : {props.goal}</div>
        <a className='increment noselect' onMouseDown={() => props.onGoalChange(+1)}>+</a>
      </div>
  )
}

// settings component - set the number of pomodoros until a long break
function LongBreakSetter(props) {
  return (
    <div className='settings-item settings-lb-set' >
        <a className='decrement noselect' onMouseDown={() => props.onSetChange(-1)} onMouseUp={props.stopSetChange}>–</a>
        <div className='settings-goal-show'>Every {props.pomodoroSet}</div>
        <a className='increment noselect' onMouseDown={() => props.onSetChange(+1)} onMouseUp={props.stopSetChange}>+</a>
      </div>
  )
}

// container and title for timers' settings component
class Settings extends Component {
  // --------------------------------------------------------------------------
//                                           handle sound select
// --------------------------------------------------------------------------

handleSoundSelect(timer,sound) {

  // clone timer
  timer = this.timerClone(timer);
  timer.sound = sound;
  
  if (timer.name === 'work') {
    this.setState({ work: timer });
  } else if (timer.name === 'break') {
    this.setState({ break: timer });
  } else if (timer.name === 'longBreak') {
    this.setState ({ longBreak: timer });
  }
}

// --------------------------------------------------------------------------
//                                     change # of sets until long break
// --------------------------------------------------------------------------


handleSetChange(change) {
  const pomodoroSet = this.state.pomodoroSet + change;
  if (pomodoroSet < 1) return;
  this.setState({ pomodoroSet });

  // continue recursing the function every 0.1 seconds if mouse click is held
  setTimeout(() => {
    if (this.state.mouseDown) this.handleSetChange(change);
  }, 100);
}

// --------------------------------------------------------------------------
//                                           change pomodoro goal
// --------------------------------------------------------------------------

handleGoalChange(change) {
  const goal = this.state.goal + change;
  if (goal < 1) return;
  this.setState({goal});

  // continue recursing the function every 0.1 seconds if mouse click is held
  setTimeout(() => {
    if (this.state.mouseDown) this.handleGoalChange(change);
  }, 100);
}

// --------------------------------------------------------------------------
//                                           increment / decrement timer
// --------------------------------------------------------------------------

handleDurationChange(timer, change) {

  // clone timer and return if new duration is inappropriate
  timer = this.timerClone(timer);
  timer.duration = timer.duration + change * 60;
  if (timer.duration < 0 || timer.duration > 5940) return; // 0 < timer < 99 minutes

  // to determine whether changes are being made to the active timer
  const workActive = timer.name === 'work' && this.state.workTime;
  const breakActive = timer.name === 'break' && !this.state.workTime && !this.state.longBreakTime;
  const longBreakActive = timer.name === 'longBreak' && this.state.longBreakTime;

  // time is added to active running timers to adjust
  if (timer.timing) {
    if (workActive) {
      timer.timeRemaining += change * 60;
    }
    if (breakActive) {
      timer.timeRemaining += change * 60;
    }
    if (longBreakActive) {
      timer.timeRemaining += change * 60;
    }
  } else { // i.e. if the activetimer is not running, the time display just updates
    if (workActive || breakActive || longBreakActive) {
      this.updateTimeShown(timer.duration);
    }
  }

  // set state
  if (timer.name === 'work') this.setState({ work: timer })
  if (timer.name === 'break') this.setState({ break: timer })
  if (timer.name === 'longBreak') this.setState({ longBreak: timer })

  // recurse the function if mouse click is held
  setTimeout(() => {
    // although this forces a new timer everytime the function is run
    if (this.state.mouseDown) this.handleDurationChange(timer.name, change);
  }, 100);

}

render() {
  return (
  <div className="timer-settings" onMouseOver={this.props.onMouseOver} onMouseOut={this.props.onMouseOut}>

    <div className="settings-group settings-work">
      <div className="timer-title work-title" style={this.props.titleStyles.workTitle}>Work</div>
      <div className="timer-settings-content" style={this.settingsStyle}>
        <TimeSetter className='settings-timer-work' timer={this.props.work}
          onDurationChange={(timer, change) => this.props.onDurationChange(timer,change)}
        />
        <SoundSelector onSampleSound={timer => this.props.onSampleSound(timer)} activeSound={this.props.workSound} timer={this.props.work} onSoundSelect={(timer, sound) => this.onSoundSelect('work', sound)} sounds={this.sounds}/>
        <GoalSetter goal={this.props.goal} onGoalChange={change => this.props.onGoalChange(change)} />
      </div>
    </div>
    
    <div className="settings-group settings-break">
      <div className="timer-title break-title" style={this.props.titleStyles.breakTitle}>Break</div>
      <div className="timer-settings-content" style={this.props.settingsStyle}>
        <TimeSetter classname='settings-timer-break' timer={this.props.break} 
          onDurationChange={(timer, change) => this.onDurationChange(timer,change)}
        />
        <SoundSelector onSampleSound={timer => this.props.onSampleSound(timer)} activeSound={this.props.breakSound} timer={this.props.break} onSoundSelect={(timer, sound) => this.props.onSoundSelect('break', sound)} sounds={this.props.sounds}/>
      </div>
    </div>

    <div className="settings-group settings-long-break">
      <div className="timer-title long-break-title" style={this.props.titleStyles.longBreakTitle}>Long Break</div>
      <div className="timer-settings-content" style={this.props.settingsStyle}>
        <TimeSetter classname='settings-timer-long-break' timer={this.props.longBreak} 
          onDurationChange={(timer, change) => this.props.onDurationChange(timer,change)}
        />
        <SoundSelector onSampleSound={timer => this.props.onSampleSound(timer)} activeSound={this.props.longBreakSound} timer={this.props.longBreak} onSoundSelect={(timer, sound) => this.props.onSoundSelect('longBreak', sound)} sounds={this.props.sounds}/>
        <LongBreakSetter
          pomodoroSet={this.props.pomodoroSet}
          onSetChange={change => this.props.handleSetChange(change)}
          stopSetChange={this.props.stopSetChange}
        />
      </div>
    </div> 


  </div>
)}
}


export default Settings;