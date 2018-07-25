// all state is stored here, as well as top-most timer functions and sounds

import React, { Component } from 'react';
import View from './View';

import Bell from '../Sounds/bell.mp3';
import Triumph from '../Sounds/triumph.mp3';
import LevelUp from '../Sounds/levelup.mp3';
import Winning from '../Sounds/winning.mp3';

class Pomodoro extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTimer: {
        name: 'work',
        timeRemaining: 1500,
        paused: true,
        now: 0,
        then: 0,
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
        duration: 1500, // seconds - 25 min default
        timeRemaining: 1500,
        sound: 'Triumph',
      },

      // BREAK TIMER
      break: {
        name: 'break',
        duration: 300, // seconds - 5 min default
        timeRemaining: 300,
        sound: 'Bell',
      },

      // LONG BREAK TIMER
      longBreak: {
        name: 'longBreak',
        duration: 900, // seconds - 15 min default
        timeRemaining: 900,
        sound: 'Winning'
      },

      // SHIFT TO STYLED COMPONENTS?
      styles: {
        // for the play and pause inner icon and the minutes remaining display
        font: {
          color: 'var(--lightred)',
        },
        // used for the progress bar background
        background: {
          background: 'var(--darkred)',
        },
        titles: {
          workTitle: {
            color: 'var(--lightred)',
            borderBottom: '6px solid var(--lightred)',
          },
          breakTitle: {
            color: '',
            borderBottom: '',
          },
          longBreakTitle: {
            color: '',
            borderBottom: '',
          }
        },
        settings: {
          maxHeight: 0,
        },
        about: {
          maxHeight: 0,
          margin: 0,
          padding: '0 2em',
        }
      }
    }

  // -----------------------------------------------------------------------------------------
  //                                                                        `this` BINDINGS
  // -----------------------------------------------------------------------------------------

    this.setMouseDown = this.setMouseDown.bind(this);
    this.setMouseUp = this.setMouseUp.bind(this);

    this.handleKeyPress = this.handleKeyPress.bind(this);

    this.changeState = this.changeState.bind(this);

    this.timerFunc = this.timerFunc.bind(this);
    this.timerClone = this.timerClone.bind(this);
    this.onTimerEnd = this.onTimerEnd.bind(this);
  }

  // -----------------------------------------------------------------------------------------
  //                                                                      LIFE CYCLE EVENTS
  // -----------------------------------------------------------------------------------------
  setMouseDown() {
    this.setState({mouseDown:true});
  }
  setMouseUp() {
    this.setState({mouseDown:false});
  }

  handleKeyPress(e) {
    if (e.key === ' ') {
      this.handlePlayPause();
    } else if (e.key === 'Escape') {
      this.handleReset(true);
    }
  }

  // keep track of mouse down and mouse up, and any key press
  componentDidMount() {
    document.addEventListener('mousedown', this.setMouseDown);
    document.addEventListener('mouseup', this.setMouseUp);
    document.addEventListener('keyup', this.handleKeyPress);
  }
  componentWillUnmount() {
    document.removeEventListener('mousedown', this.setMouseDown);
    document.removeEventListener('mouseup', this.setMouseUp);
    document.addEventListener('keyup', this.handleKeyPress);
  }


  // -----------------------------------------------------------------------------------------
  //                                                                              FUNCTIONS
  // -----------------------------------------------------------------------------------------

  changeState(...args) {
    this.setState(...args);
  }

  // --------------------------------------------------------------------------
  //                                           timer function - to rewrite
  // --------------------------------------------------------------------------

  // timer function called every second while timer is on
  timerFunc() {
    // clone active timer
    const timer = {...this.state.activeTimer};

    // if timer ends
    if (timer.timeRemaining < 1) this.onTimerEnd(timer);

    timer.timeRemaining = Math.round((timer.then - Date.now()) / 1000);
    // timer.timeRemaining = Date.now();

    // set new state
    this.setState({ activeTimer: timer }) 
  }

  // --------------------------------------------------------------------------
  //                                           timer cloner
  // --------------------------------------------------------------------------

  timerClone() { // defaults to work timer
    return {...this.state[this.state.activeTimer.name]};
  }


  onTimerEnd() {
    this.handleReset();

    const timer = this.timerClone();

    // play the appropriate sound for the timer
    this.props.playSound(timer.name);

  };


  // -----------------------------------------------------------------------------------------
  //                                                                              MAIN RENDER
  // -----------------------------------------------------------------------------------------


  render() {
    return (
      <div className="app">

        <View {...this.state} changeState={this.changeState} onTimerEnd={this.onTimerEnd} timerClone timerFunc={this.timerFunc} />
        <audio src={Bell} ref="Bell" />
        <audio src={Triumph} ref="Triumph" />
        <audio src={LevelUp} ref="LevelUp" />
        <audio src={Winning} ref="Winning" />

      </div>
    );
  }
}

export default Pomodoro;
