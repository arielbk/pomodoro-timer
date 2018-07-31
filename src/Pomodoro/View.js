import React, { Component } from 'react';
import ButtonProgress from './ButtonProgress';
import ShowTime from './ShowTime';
import Counters from './Counters';
import Settings from './Settings/index.js';
import About from './About';
import './css/view.css';

class View extends Component {
  constructor(props) {
    super(props);
    this.handleSettingsToggle = this.handleSettingsToggle.bind(this);
    this.handleAboutToggle = this.handleAboutToggle.bind(this);    
  }

  // --------------------------------------------------------------------------
  //                                           timer end function - come back to
  // -------------------------------------------------------------------------- 

  // --------------------------------------------------------------------------
  //                                           handle settings toggle
  // --------------------------------------------------------------------------

  // this allows for a more robust experience, mobile users can click to expand settings
  // if user mouses on to settings it will only ever open, mouse off only closes, clicking will toggle
  handleSettingsToggle(action = 'toggle') {
    const styles = JSON.parse(JSON.stringify(this.props.styles));
    if (action === 'show') {
      if (!styles.settings.maxHeight) {
        styles.settings.maxHeight = '999px'
      } else {
        return;
      }
    } else if (action === 'hide') {
      if (!styles.settings.maxHeight) {
        return;
      } else {
        styles.settings.maxHeight = 0;
      }
    } else {
      !styles.settings.maxHeight
      ? styles.settings.maxHeight = '999px'
      : styles.settings.maxHeight = 0;
    }
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



  render() {
    return (
    <div>  
      <h1 className="main-header">Pomodoro Timer</h1>
      <div className="top-divider"></div>

      <div className="main-content">
      <ButtonProgress 
        changeState={this.props.changeState}
        styles={this.props.styles}
        activeTimer={this.props.activeTimer}
        timerFunc={this.props.timerFunc}
        work={this.props.work}
        break={this.props.break}
        longBreak={this.props.longBreak}
        intervalID={this.props.intervalID}
      />
      <ShowTime
        font={this.props.styles.font}
        timeRemaining={this.props.activeTimer.timeRemaining}
      />
      <Counters 
        pomodoros={this.props.pomodoros}
        goal={this.props.goal}
      />
    </div>
    
      <Settings
        changeState={this.props.changeState}
        activeTimer={this.props.activeTimer}
        mouseDown={this.props.mouseDown}
        titleStyles={this.props.styles.titles}
        work={this.props.work}
        break={this.props.break}
        longBreak={this.props.longBreak}
        goal={this.props.goal}
        pomodoroSet={this.props.pomodoroSet}
        sounds={this.props.sounds}
        workSound={this.props.work.sound}
        breakSound={this.props.break.sound}
        longBreakSound={this.props.longBreak.sound}
        onSampleSound={this.props.onSampleSound}
        showSettings={this.props.showSettings}
        settingsStyle={this.props.styles.settings}
        onSettingsToggle={this.handleSettingsToggle}
      />

      <About styles={this.props.styles.about} onAboutToggle={this.handleAboutToggle} />

    </div>
  )}
}
export default View;