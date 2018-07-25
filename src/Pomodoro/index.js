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
        timeRemaining: 5,
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
        duration: 5, // seconds - 25 min default
        sound: 'Triumph',
      },

      // BREAK TIMER
      break: {
        name: 'break',
        duration: 3, // seconds - 5 min default
        timeRemaining: 3,
        sound: 'Bell',
      },

      // LONG BREAK TIMER
      longBreak: {
        name: 'longBreak',
        duration: 10, // seconds - 15 min default
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

    this.timerFunc = this.timerFunc.bind(this);
    this.onTimerEnd = this.onTimerEnd.bind(this);

    this.timerStyler = this.timerStyler.bind(this);

    this.changeState = this.changeState.bind(this);

    this.handleSampleSound = this.handleSampleSound.bind(this);
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

  // keep track of mouse down and mouse up, and any key press
  componentDidMount() {
    document.addEventListener('mousedown', this.setMouseDown);
    document.addEventListener('mouseup', this.setMouseUp);
  }
  componentWillUnmount() {
    document.removeEventListener('mousedown', this.setMouseDown);
    document.removeEventListener('mouseup', this.setMouseUp);
  }


  // -----------------------------------------------------------------------------------------
  //                                                                              FUNCTIONS
  // -----------------------------------------------------------------------------------------

  // --------------------------------------------------------------------------
  //                                           timer function
  // --------------------------------------------------------------------------

  // timer function called every second while timer is on
  timerFunc() {
    // clone active timer
    const timer = {...this.state.activeTimer};

    // if timer ends
    if (timer.timeRemaining < 1) {
      this.onTimerEnd(timer);
      return;
    }

    timer.timeRemaining = Math.round((timer.untilTime - Date.now()) / 1000);

    // set new state
    this.setState({ activeTimer: timer }) 
  }

  // --------------------------------------------------------------------------
  //                                           timer ends
  // --------------------------------------------------------------------------

  onTimerEnd() {
    let activeTimer = {...this.state.activeTimer};
    clearInterval(activeTimer.intervalID);

    this.refs[this.state[activeTimer.name].sound].play();

    let nextTimer;
    if (activeTimer.name === 'work') {
      const pomodoros = this.state.pomodoros + 1;
      this.setState({pomodoros});
      if (pomodoros === this.state.pomodoroSet) {
        nextTimer = {...this.state.longBreak};
      } else {
        nextTimer = {...this.state.break};
      }
    } else {
      nextTimer = {...this.state.work};
    }

    activeTimer.name = nextTimer.name;
    activeTimer.timeRemaining = nextTimer.duration;
    activeTimer.paused = true;

    this.setState({ activeTimer }, this.timerStyler);
  };


// --------------------------------------------------------------------------
  //       timer styler - does not really belong here - styled components coming
  // --------------------------------------------------------------------------

  timerStyler() {

    const styles = JSON.parse(JSON.stringify(this.state.styles)); // deep clone
    const timerName = this.state.activeTimer.name;

    // empty out styles
    styles.titles = {
      workTitle: { color: '', borderBottom: '' },
      breakTitle: { color: '', borderBottom: '' },
      longBreakTitle: { color: '', borderBottom: '' }
    }

    if (timerName === 'work') { // reflect next work cycle
      styles.titles.workTitle.color = 'var(--lightred)';
      styles.titles.workTitle.borderBottom = '6px solid var(--lightred)';

      styles.font.color = 'var(--lightred)';
      styles.background.background = 'var(--darkred)';

    } else if (timerName === 'break') {
      styles.titles.breakTitle.color = 'var(--lightorange)';
      styles.titles.breakTitle.borderBottom = '6px solid var(--lightorange)';

      styles.font.color = 'var(--lightorange)';
      styles.background.background = 'var(--darkorange)';

    } else if (timerName === 'longBreak' ) {
      styles.titles.longBreakTitle.color = 'var(--lightgreen)';
      styles.titles.longBreakTitle.borderBottom = '6px solid var(--lightgreen)';
      styles.font.color = 'var(--lightgreen)';
      styles.background.background = 'var(--darkgreen)';

    }  

    // set new styles
    this.setState({ styles });
  }


  handleSampleSound(timer) {
    const sound = this.state[timer].sound;
    this.refs[sound].play();
  }




  changeState(args) {
    this.setState({...args}, () => args.activeTimer ? this.timerStyler() : '');
    // this will also check the styles if the active timer is interacted with...
  }

  // -----------------------------------------------------------------------------------------
  //                                                                              MAIN RENDER
  // -----------------------------------------------------------------------------------------

  render() {
    return (
      <div className="app">

        <View {...this.state} changeState={this.changeState} onTimerEnd={this.onTimerEnd} timerClone timerFunc={this.timerFunc} onSampleSound={this.handleSampleSound} />
        <audio src={Bell} ref="Bell" />
        <audio src={Triumph} ref="Triumph" />
        <audio src={LevelUp} ref="LevelUp" />
        <audio src={Winning} ref="Winning" />

      </div>
    );
  }
}

export default Pomodoro;
