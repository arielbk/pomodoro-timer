import React, { Component } from 'react';
import { TimersProvider } from './TimersContext';

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
  //                                           handle settings toggle
  // --------------------------------------------------------------------------

  // this allows for a more robust experience, mobile users can click to expand settings
  // if user mouses on to settings it will only ever open, mouse off only closes, clicking will toggle
  handleSettingsToggle = (action = 'toggle') => {
    // const styles = JSON.parse(JSON.stringify(this.props.styles));
    // if (action === 'show') {
    //   if (!styles.settings.maxHeight) {
    //     styles.settings.maxHeight = '999px'
    //   } else {
    //     return;
    //   }
    // } else if (action === 'hide') {
    //   if (!styles.settings.maxHeight) {
    //     return;
    //   } else {
    //     styles.settings.maxHeight = 0;
    //   }
    // } else {
    //   !styles.settings.maxHeight
    //   ? styles.settings.maxHeight = '999px'
    //   : styles.settings.maxHeight = 0;
    // }
    // this.props.changeState({styles});
    console.log('trying to change up the settings sections');
  }

  // --------------------------------------------------------------------------
  //                                           handle about toggle
  // --------------------------------------------------------------------------

  handleAboutToggle = () => {
    // const styles = JSON.parse(JSON.stringify(this.props.styles));
    // if (!styles.about.maxHeight) {
    //   styles.about.maxHeight = '999px';
    //   styles.about.marginTop = '2em';
    //   styles.about.padding = '1em 2em';
    // } else {
    //   styles.about.maxHeight = 0;
    //   styles.about.marginTop = 0;
    //   styles.about.padding = '0 2em';
    // }
    // this.props.changeState({styles});
    console.log('trying to toggle the about sections!');
  }

  render() {
    return (
      <TimersProvider>
    <div className="app">  
      <h1 className="main-header">Pomodoro Timer</h1>
      <div className="top-divider"></div>

      <div className="main-content">
        <ButtonProgress />
        <ShowTime />
        <Counters />
      </div>
    
      <Settings
        onSettingsToggle={this.handleSettingsToggle}
      />

      <About onAboutToggle={this.handleAboutToggle} />

    </div>
    </TimersProvider>
  )}
}
export default View;