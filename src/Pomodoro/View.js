import React, { Component } from 'react';
import ButtonProgress from './ButtonProgress';
import ShowTime from './ShowTime';
import Counters from './Counters';
import Settings from './Settings';

class View extends Component {

  // --------------------------------------------------------------------------
  //                                           timer function
  // --------------------------------------------------------------------------

  // timer function called every second while timer is on
  timerFunc() {

    // clone active timer
    let timer;
    if (this.state.longBreakTime) {
      timer = this.timerClone('longBreak');
    } else if (this.state.workTime) {
      timer = this.timerClone('work')     
    } else {
      timer = this.timerClone('break');
    }

    // styles to re-set
    const styles = JSON.parse(JSON.stringify(this.state.styles)); // deep clone

    // if timer ends
    if (timer.timeRemaining < 1) {
      this.handleReset();
      if (this.state.workTime &&
          ((this.state.pomodoros + 1) % this.state.pomodoroSet) === 0 ) 
                        this.setState({ longBreakTime: true });
      this.setState({ workTime: !this.state.workTime })

      // play the appropriate sound for the timer
      if (timer.name === 'work') {
        this.refs[this.state.work.sound].play();
      } else if (timer.name === 'break') {
        this.refs[this.state.break.sound].play();
      } else if (timer.name === 'longBreak') {
        this.refs[this.state.longBreak.sound].play();
      }

      // empty out titles styles
      styles.titles = {
        workTitle: { color: '', borderBottom: '' },
        breakTitle: { color: '', borderBottom: '' },
        longBreakTitle: { color: '', borderBottom: '' }
      }

      if (this.state.longBreakTime ) { // reflect long break cycle
        styles.titles.longBreakTitle.color = 'var(--lightgreen)';
        styles.titles.longBreakTitle.borderBottom = '6px solid var(--lightgreen)';
        styles.font.color = 'var(--lightgreen)';
        styles.background.background = 'var(--darkgreen)';

        this.updateTimeShown(this.state.longBreak.timeRemaining);
        this.setState(prevState => { 
          return { pomodoros: prevState.pomodoros + 1, progressPercent: 0 } 
        });
      } else if (this.state.workTime) { // reflect next work cycle
        styles.titles.workTitle.color = 'var(--lightred)';
        styles.titles.workTitle.borderBottom = '6px solid var(--lightred)';

        styles.font.color = 'var(--lightred)';
        styles.background.background = 'var(--darkred)';

        this.updateTimeShown(this.state.work.timeRemaining);
        this.setState({ longBreakTime: false });
      } else { // reflect next break cycle
        styles.titles.breakTitle.color = 'var(--lightorange)';
        styles.titles.breakTitle.borderBottom = '6px solid var(--lightorange)';

        styles.font.color = 'var(--lightorange)';
        styles.background.background = 'var(--darkorange)';

        this.updateTimeShown(this.state.break.timeRemaining);
        this.setState(prevState => {
          return { pomodoros: prevState.pomodoros + 1, longBreakTime: false}
        });
      }

      // set new styles
      const playPauseIcon = 'fas fa-play';
      this.setState({ styles, playPauseIcon, progressPercent: 0 });

      return; // end function
    };

    // V  TIMER IS STILL RUNNING  V

    // decrement the active timer
    timer.timeRemaining--;

    this.updateTimeShown(timer.timeRemaining);
    const progressPercent = Number.parseFloat((timer.duration - timer.timeRemaining) / timer.duration * 100 ).toFixed(2);

    // set new state
    if (this.state.longBreakTime) {
      this.setState({ longBreak: timer, progressPercent }) 
    } else if (this.state.workTime) {
      this.setState({ work: timer, progressPercent })     
    } else {
      this.setState({ break: timer, progressPercent });
    }
  }


  render() {
    return (
    <div>  
        
      <div className="main-content">
      <ButtonProgress 
        playPauseColor={this.props.styles.playPause} 
        // handleClick={this.handlePlayPause}
        faIcon={this.props.playPauseIcon}
        // onReset={() => this.handleReset(true)}
        progressPercent={this.props.progressPercent}
        workTime={this.props.workTime}
        longBreakTime={this.props.longBreakTime}
        fontColor={this.props.styles.font}
        backgroundColor={this.props.styles.background}
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
    </div>
  )}
}
export default View;