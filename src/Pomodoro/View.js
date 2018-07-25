import React, { Component } from 'react';
import ButtonProgress from './ButtonProgress';
// import ShowTime from './ShowTime';
// import Counters from './Counters';
// import Settings from './Settings';

class View extends Component {
  constructor(props) {
    super(props);
    this.handleSettingsToggle = this.handleSettingsToggle.bind(this);
    this.handleAboutToggle = this.handleAboutToggle.bind(this);
    this.timerStyler = this.timerStyler.bind(this);
  }

  // --------------------------------------------------------------------------
  //                                           timer end function - come back to
  // -------------------------------------------------------------------------- 

    // --------------------------------------------------------------------------
  //                                           handle settings toggle
  // --------------------------------------------------------------------------

  handleSettingsToggle() {
    const styles = JSON.parse(JSON.stringify(this.props.styles));
    !styles.settings.maxHeight
      ? styles.settings.maxHeight = '999px'
      : styles.settings.maxHeight = 0;
    this.props.changeState({styles});
  }

  // --------------------------------------------------------------------------
  //                                           handle about toggle
  // --------------------------------------------------------------------------

  handleAboutToggle() {
    const styles = JSON.parse(JSON.stringify(this.props.styles));
    if (!styles.about.maxHeight) {
      styles.about.maxHeight = '999px';
      styles.about.marginTop = '2em';
      styles.about.padding = '1em 2em';
    } else {
      styles.about.maxHeight = 0;
      styles.about.marginTop = 0;
      styles.about.padding = '0 2em';
    }
    this.props.changeState({styles});
  }

  // --------------------------------------------------------------------------
  //                                           timer styler
  // --------------------------------------------------------------------------

  timerStyler() {

    const styles = this.props.styles;
    const activeTimer = this.props.activeTimer;

    // empty out titles styles
    styles.titles = {
      workTitle: { color: '', borderBottom: '' },
      breakTitle: { color: '', borderBottom: '' },
      longBreakTitle: { color: '', borderBottom: '' }
    }

    if (activeTimer === 'longBreak' ) { // reflect long break cycle
      styles.titles.longBreakTitle.color = 'var(--lightgreen)';
      styles.titles.longBreakTitle.borderBottom = '6px solid var(--lightgreen)';
      styles.font.color = 'var(--lightgreen)';
      styles.background.background = 'var(--darkgreen)';

      this.updateTimeShown(this.state.longBreak.timeRemaining);
      this.props.changeState(prevState => { 
        return { pomodoros: prevState.pomodoros + 1, progressPercent: 0 } 
      });

    } else if (activeTimer === 'work') { // reflect next work cycle
      styles.titles.workTitle.color = 'var(--lightred)';
      styles.titles.workTitle.borderBottom = '6px solid var(--lightred)';

      styles.font.color = 'var(--lightred)';
      styles.background.background = 'var(--darkred)';

      this.updateTimeShown(this.state.work.timeRemaining);
      this.props.changeState({ longBreakTime: false });

    } else if (activeTimer === 'break') {
      styles.titles.breakTitle.color = 'var(--lightorange)';
      styles.titles.breakTitle.borderBottom = '6px solid var(--lightorange)';

      styles.font.color = 'var(--lightorange)';
      styles.background.background = 'var(--darkorange)';

      this.updateTimeShown(this.state.break.timeRemaining);
      this.props.changeState(prevState => {
        return { pomodoros: prevState.pomodoros + 1, longBreakTime: false}
      });
    }

    // set new styles
    this.props.changeState({ styles });
  }


  render() {
    return (
    <div>  
      <h1 className="main-header">Pomodoro Timer</h1>
      <div className="top-divider"></div>

      <div className="main-content">
      <ButtonProgress 
        styles={this.props.styles} 
        handleClick={this.timerFunc}
        faIcon={this.props.activeTimer.paused ? 'fas fa-play' : 'fas fa-pause'}
        // onReset={() => this.handleReset(true)}
        activeTimer={this.props.activeTimer} // pass the actual timer
        timerFunc={this.props.timerFunc}
        changeState={this.props.changeState}
      />
      {/* <ShowTime
        font={this.props.styles.font}
        time={this.props.showTime}
      />
      <Counters 
        pomodoros={this.props.pomodoros}
        goal={this.props.goal}
      /> */}
    </div>
    
      {/* <Settings
      titleStyles={this.props.styles.titles}
      work={this.props.work}
      break={this.props.break}
      longBreak={this.props.longBreak}
      // onDurationChange={(timer, change) => this.handleDurationChange(timer, change)}
      // onGoalChange={change => this.handleGoalChange(change)}
      goal={this.props.goal}
      pomodoroSet={this.props.pomodoroSet}
      // handleSetChange={this.handleSetChange}
      sounds={this.props.sounds}
      workSound={this.props.work.sound}
      breakSound={this.props.break.sound}
      longBreakSound={this.props.longBreak.sound}
      // onSoundSelect={(timer, sound) => this.handleSoundSelect(timer, sound)}
      // onSampleSound={timer => {
      //   if (timer === 'work') {
      //     this.refs[this.props.work.sound].play();
      //   } else if (timer === 'break') {
      //     this.refs[this.props.break.sound].play();
      //   } else if (timer === 'longBreak') {
      //     this.refs[this.props.longBreak.sound].play();
      //   }
      // }}
      showSettings={this.props.showSettings}
      settingsStyle={this.props.styles.settings}
      // onMouseOver={this.handleSettingsToggle}
      // onMouseOut={this.handleSettingsToggle}
      /> */}

      <div className="about-pomodoro" style={this.props.styles.about}>
        <p>The Pomodoro Technique is a time management method developed by Francesco Cirillo in the late 1980s.</p>
        <p>The technique uses a timer to break down work into intervals, traditionally 25 minutes in length, separated by short breaks.</p>
        <p>These intervals are named pomodoros, the plural in English of the Italian word pomodoro (tomato), after the tomato-shaped kitchen timer that Cirillo used as a university student.</p>
      <div className="close-btn-about" onClick={this.handleAboutToggle}>✕</div>
      </div>

      <div className="options">
        <div className="options-btn-about" onClick={this.handleAboutToggle}>about</div>
      </div>

    </div>
  )}
}
export default View;