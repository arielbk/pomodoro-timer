import React, { Component } from 'react';
import { TimersProvider } from './TimersContext';

import ButtonProgress from './ButtonProgress';
import ShowTime from './ShowTime';
import Counters from './Counters';
import Settings from './Settings/index.js';
import About from './About';

import styled from 'styled-components';

class View extends Component {
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
        <App>
          <MainHeader>Pomodoro Timer</MainHeader>
          <TopDivider />
          <MainContent>

            {/* actual (non-styled) components */}
            <ButtonProgress />
            <ShowTime />
            <Counters />

          </MainContent>

            {/* actual (non-styled) components */}
          <Settings onSettingsToggle={this.handleSettingsToggle} />
          <About onAboutToggle={this.handleAboutToggle} />

        </App>
      </TimersProvider>
  )}
}
export default View;

const App = styled.div`
  position: relative;
  max-width: 940px;
  background: var(--darkgrey);
  box-shadow: 0 12px 50px rgba(0,0,0,.6);
  border-radius: 5px;
  margin: 30px auto 60px auto;
  padding: 40px 60px 80px 60px;
`;

const MainHeader = styled.div`
  font-size: 3.6em;
  text-align: center;
  margin: 0;
`;

const TopDivider = styled.div`
  height: 5px;
  width: 100%;
  background: var(--medgrey);
  border-radius: 5px;
  margin: 20px 0;
`;

const MainContent = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: 60px 0 40px 0;
`;