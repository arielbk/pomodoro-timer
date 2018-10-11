import React, { Component } from 'react';

// import sounds for use in different components
import Bell from '../Sounds/bell.mp3';
import Triumph from '../Sounds/triumph.mp3';
import LevelUp from '../Sounds/levelup.mp3';
import Winning from '../Sounds/winning.mp3';

const TimersContext = React.createContext();

export class TimersProvider extends Component {
  // all timer state lives here
  state = {
    activeTimer: {
      name: 'work',
      timeRemaining: 1500000,
      duration: 1500000, // so that settings changes does not alter things - freeze timer duration
      paused: true,
      untilTime: 0,
      intervalID: 0,
    },

    showSettings: false,

    // helps with the settings incrementors/decrementors that fire while the mouse is down
    mouseDown: false,

    // pomodoros completed, pomodoro goal, pomodoros between each long break
    pomodoros: 0,
    goal: 8,
    pomodoroSet: 4,

    // sound names to assign to a timer
    sounds: [
      'Bell',
      'Triumph',
      'LevelUp',
      'Winning',
    ],

      // WORK TIMER
      work: {
        name: 'work',
        duration: 1500000, // mseconds - 25 min default
        sound: 'Triumph',
      },

      // BREAK TIMER
      break: {
        name: 'break',
        duration: 300000, // mseconds - 5 min default
        sound: 'Bell',
      },

      // LONG BREAK TIMER
      longBreak: {
        name: 'longBreak',
        duration: 900000, // mseconds - 15 min default
        sound: 'Winning'
      },
  }

  // FUNCTIONS

  // --------------------------------------------------------------------------
  //                                           mouse down/up
  // --------------------------------------------------------------------------

  setMouseDown = () => {
    this.setState({ mouseDown: true })
  }
  setMouseUp = () => {
    this.setState({ mouseDown: false })
  }

  // --------------------------------------------------------------------------
  //    COME BACK TO THIS - why just 'sample'? -->     play timers sound
  // --------------------------------------------------------------------------

  handleSampleSound = (timer) => {
    const sound = this.state[timer].sound;
    this.refs[sound].play();
  }

  // --------------------------------------------------------------------------
  //                                           timer function
  // --------------------------------------------------------------------------

  // timer function called every second while timer is on
  timerFunc = () => {
    // clone active timer
    const timer = {...this.state.activeTimer};

    // if timer ends
    if (timer.timeRemaining < 250) {
      this.onTimerEnd(timer);
      return;
    }

    timer.timeRemaining = Math.round(timer.untilTime - Date.now());

    // set new state
    this.setState({ activeTimer: timer }) 
  }


  // --------------------------------------------------------------------------
  //                                           timer ends
  // --------------------------------------------------------------------------

  onTimerEnd = () => {
    let activeTimer = {...this.state.activeTimer};
    clearInterval(activeTimer.intervalID);

    this.refs[this.state[activeTimer.name].sound].play();

    let nextTimer;
    if (activeTimer.name === 'work') {
      const pomodoros = this.state.pomodoros + 1;
      this.setState({pomodoros});
      if (pomodoros % this.state.pomodoroSet === 0) {
        nextTimer = {...this.state.longBreak};
      } else {
        nextTimer = {...this.state.break};
      }
    } else {
      nextTimer = {...this.state.work};
    }

    activeTimer.name = nextTimer.name;
    activeTimer.duration = nextTimer.duration;
    activeTimer.timeRemaining = activeTimer.duration;
    activeTimer.paused = true;

    this.setState({ activeTimer }, this.timerStyler);
  };

  // --------------------------------------------------------------------------
  //                                           play/pause timer
  // --------------------------------------------------------------------------

  handlePlayPause = () => {
    let timer = {...this.state.activeTimer};

    // pause or play the timer depending on current state
    if (timer.paused) {
      timer.untilTime = Date.now() + timer.timeRemaining;
      timer.intervalID = setInterval(() => this.timerFunc(), 50);
    } else {
      clearInterval(timer.intervalID);
    }

    timer.paused = !timer.paused;
    
    this.setState({ activeTimer: timer })
  }


  // --------------------------------------------------------------------------
  //                                           handle reset
  // --------------------------------------------------------------------------

  // default back to work timer
  handleReset = () => {
    const activeTimer = {...this.state.activeTimer};

    // end any running timer function
    clearInterval(activeTimer.intervalID);

    const duration = this.state.work.duration;
    
    activeTimer.name = 'work';
    activeTimer.timeRemaining = duration;
    activeTimer.duration = duration;
    activeTimer.paused = true;

    this.setState({ activeTimer });
  }

  // --------------------------------------------------------------------------
  //                                           goal change
  // --------------------------------------------------------------------------
  
  handleGoalChange = (change) => {
    const goal = this.state.goal + change;
    if (goal < 1) return;
    this.props.changeState({ goal });

    // continue recursing the function every 0.1 seconds if mouse click is held
    setTimeout(() => {
      if (this.props.mouseDown) this.handleGoalChange(change);
    }, 100);
  }

  // --------------------------------------------------------------------------
  //                                           pomodoro set change
  // --------------------------------------------------------------------------

  handleSetChange = (change) => {
    const pomodoroSet = this.state.pomodoroSet + change;
    if (pomodoroSet < 1) return;
    this.setState({ pomodoroSet });

    // continue recursing the function every 0.1 seconds if mouse click is held
    setTimeout(() => {
      if (this.state.mouseDown) this.handleSetChange(change);
    }, 100);
  }

  // --------------------------------------------------------------------------
  //                                           pomodoro set change
  // --------------------------------------------------------------------------

  // tbis will cause problems because it relies on props... come back to it
  handleSoundSelect = (sound) => {
    // clone timer
    const timer = {...this.props.timer};
    timer.sound = sound;
    
    this.setState({ [timer.name]: timer })
  }

  // --------------------------------------------------------------------------
  //                                           timer duration change
  // --------------------------------------------------------------------------

  handleDurationChange = (change) => {

    // clone timer and return if new duration is inappropriate
    const timer = {...this.props.timer}
    timer.duration += change * 60 * 1000; // from minutes to milliseconds
    if (timer.duration < 0 || timer.duration > 5940000) return; // 0 < timer < 99 minutes

    // set state
    this.props.changeState({ [timer.name]: timer })

    // set current timer if it is the one being changed and it has not started
    const activeTimer = this.props.activeTimer;
    if (timer.name === activeTimer.name && activeTimer.duration === activeTimer.timeRemaining) {
      activeTimer.duration = timer.duration;
      activeTimer.timeRemaining = timer.duration;
      this.setState({ activeTimer });
    }
    
    // recurse the function if mouse click is held
    setTimeout(() => {
      if (this.props.mouseDown) this.handleDurationChange(change);
    }, 100);
  }


  render() {
    return (
      <TimersContext.Provider value={{
        state: this.state,
        sounds: { Bell, Triumph, LevelUp, Winning },
        setMouseUp: this.setMouseUp,
        setMouseDown: this.setMouseDown,
        handleSampleSound: this.handleSampleSound,
        timerFunc: this.timerFunc,
        onTimerEnd: this.onTimerEnd,
        handlePlayPause: this.handlePlayPause,
        handleReset: this.handleReset,
        handleGoalChange: this.handleGoalChange,
        handleSetChange: this.handleSetChange,
        handleSoundSelect: this.handleSoundSelect,
        handleDurationChange: this.handleDurationChange,
      }}>

        { this.props.children }

        <audio src={Bell} ref="Bell" />
        <audio src={Triumph} ref="Triumph" />
        <audio src={LevelUp} ref="LevelUp" />
        <audio src={Winning} ref="Winning" />
      </TimersContext.Provider>
    )
  }
}

export default TimersContext;