import React, { Component } from 'react';
import TimersContext from '../TimersContext';
import GoalSetter from './GoalSetter';
import LongBreakSetter from './LongBreakSetter';
import SoundSetter from './SoundSetter';
import TimeSetter from './TimeSetter';
import './css/settings.css';

// container and title for timers' settings component
export default class Settings extends Component {
  render() {
    return (
      <TimersContext>
        {context => (
          <div className="timer-settings" onMouseOver={() => this.props.onSettingsToggle('show')} onMouseOut={() => this.props.onSettingsToggle('hide')}>

            <div className="settings-group settings-work">
              <div className="timer-title work-title" onClick={this.props.onSettingsToggle}>Work</div>
              <div className="timer-settings-content">
                <TimeSetter className='settings-timer-work' timerName="work"/>
                <SoundSetter timerName="work" />
                <GoalSetter timerName="work" />
              </div>
            </div>
            
            <div className="settings-group settings-break">
              <div className="timer-title break-title"  onClick={this.props.onSettingsToggle}>Break</div>
              <div className="timer-settings-content">
                <TimeSetter classname='settings-timer-break' timerName="break" />
                <SoundSetter timerName="break" />
              </div>
            </div>

            <div className="settings-group settings-long-break">
              <div className="timer-title long-break-title" onClick={this.props.onSettingsToggle}>Long Break</div>
              <div className="timer-settings-content">
                <TimeSetter classname='settings-timer-long-break' timerName="longBreak" />
                <SoundSetter timerName="longBreak" />
                <LongBreakSetter timerName="longBreak" />
              </div>
            </div> 

          </div>
        )}
    </TimersContext>
  )}
}