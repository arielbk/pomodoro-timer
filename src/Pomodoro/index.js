import React, { Component } from 'react';
import View from './View';

import Bell from '../Sounds/bell.mp3';
import Triumph from '../Sounds/triumph.mp3';
import LevelUp from '../Sounds/levelup.mp3';
import Winning from '../Sounds/winning.mp3';

// this is the part that can be seriously culled...

class Pomodoro extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // these two booleans will determine whether it is work, break, or longBreak time
      // but should they just be simplified into one?
      workTime: true,
      longBreakTime: false,

      showSettings: false,

      // the interval for the timer function (in order to stop it)
      intervalID: 0,
      // whether the active timer is currently running, and whether it has started (it can be started but paused)
      timing: false,
      timerStarted: false,

      // helps with the settings incrementors and decrementors that fire while the mouse is down
      mouseDown: false,

      // current percentage of time elapsed in active timer - to display for the progress bar
      progressPercent: 0,

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
        duration: 1500, // 25*60 -- 25 minutes is default
        timeRemaining: 1500,
        sound: 'Triumph',
      },

      // BREAK TIMER
      break: {
        name: 'break',
        duration: 300, // 5 minutes default
        timeRemaining: 300,
        sound: 'Bell',
      },

      // LONG BREAK TIMER
      longBreak: {
        name: 'longBreak',
        duration: 900, // 15 minutes default
        timeRemaining: 900,
        sound: 'Winning'
      },

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
      },

      // time remaining to display - default work 25 min
      showTime: {
        mins: '25',
        secs: '00',
        msecs: '000',
      },

      playPauseIcon: 'fas fa-play',
    }

  // -----------------------------------------------------------------------------------------
  //                                                                        `this` BINDINGS
  // -----------------------------------------------------------------------------------------

    this.handleSettingsToggle = this.handleSettingsToggle.bind(this);
    this.handleAboutToggle = this.handleAboutToggle.bind(this);

    this.setMouseDown = this.setMouseDown.bind(this);
    this.setMouseUp = this.setMouseUp.bind(this);

    this.handleKeyPress = this.handleKeyPress.bind(this);

    this.changeState = this.changeState.bind(this);
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
  //                                           timer cloner
  // --------------------------------------------------------------------------

  timerClone(timer = 'work') { // defaults to work timer
    if (timer === 'work') {
      return {...this.state.work};
    } else if (timer === 'break') {
      return {...this.state.break};
    } else if (timer === 'longBreak') {
      return {...this.state.longBreak};
    }
    return;
  }

  // --------------------------------------------------------------------------
  //                                           handle settings toggle
  // --------------------------------------------------------------------------

  handleSettingsToggle() {
    const styles = JSON.parse(JSON.stringify(this.state.styles));
    !styles.settings.maxHeight
      ? styles.settings.maxHeight = '999px'
      : styles.settings.maxHeight = 0;
    this.setState({styles});
  }

  // --------------------------------------------------------------------------
  //                                           handle about toggle
  // --------------------------------------------------------------------------

  handleAboutToggle() {
    const styles = JSON.parse(JSON.stringify(this.state.styles));
    if (!styles.about.maxHeight) {
      styles.about.maxHeight = '999px';
      styles.about.marginTop = '2em';
      styles.about.padding = '1em 2em';
    } else {
      styles.about.maxHeight = 0;
      styles.about.marginTop = 0;
      styles.about.padding = '0 2em';
    }
    this.setState({styles});
  }

  // -----------------------------------------------------------------------------------------
  //                                                                              MAIN RENDER
  // -----------------------------------------------------------------------------------------


  render() {
    return (
      <div className="app">
        <h1 className="main-header">Pomodoro Timer</h1>
        <div className="top-divider"></div>
        
          <View {...this.state} changeState={this.changeState}/>

          <div className="about-pomodoro" style={this.state.styles.about}>
            <p>The Pomodoro Technique is a time management method developed by Francesco Cirillo in the late 1980s.</p>
            <p>The technique uses a timer to break down work into intervals, traditionally 25 minutes in length, separated by short breaks. These intervals are named pomodoros, the plural in English of the Italian word pomodoro (tomato), after the tomato-shaped kitchen timer that Cirillo used as a university student.</p>
          <div className="close-btn-about" onClick={this.handleAboutToggle}>✕</div>
          </div>

          <div className="options">
            <div className="options-btn-about" onClick={this.handleAboutToggle}>about</div>
          </div>
        
        <audio src={Bell} ref="Bell" />
        <audio src={Triumph} ref="Triumph" />
        <audio src={LevelUp} ref="LevelUp" />
        <audio src={Winning} ref="Winning" />

      </div>
    );
  }
}

export default Pomodoro;
