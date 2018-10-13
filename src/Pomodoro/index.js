import React, { Component, Fragment } from 'react';
import { TimersProvider } from './TimersContext';

import Toggle from '../Utilities/Toggle';
import Modal from '../Elements/Modal';

import ButtonProgress from './ButtonProgress';
import ShowTime from './ShowTime';
import Counters from './Counters';
import Settings from './Settings/index.js';
import About from './About';
import Titles from './Titles';

import styled from 'styled-components';

class View extends Component {
  render() {
    return (
      <TimersProvider>
        <App>
          <MainHeader>Pomodoro Timer</MainHeader>
          <Divider />
          <MainContent>

            {/* actual (non-styled) components */}
            <ButtonProgress />
            <ShowTime />
            <Counters />

          </MainContent>

          <Titles />

          <Toggle>
            {({on, toggle}) => (
              <Fragment>
                <AboutToggle onClick={toggle}>About</AboutToggle>
                <Modal toggle={toggle} on={on}>
                  <About />
                </Modal>
              </Fragment>
            )}
          </Toggle>

          <Toggle>
            {({on, toggle}) => (
              <Fragment>
                <SettingsToggle onClick={toggle}>Settings</SettingsToggle>
                <Modal toggle={toggle} on={on}>
                  <Settings />
                </Modal>
              </Fragment>
            )}
          </Toggle>

          {/* <SettingsToggle onClick={this.handleSettingsToggle}>Settings</SettingsToggle>
            {this.state.showSettings && <Settings />} */}

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

const MainHeader = styled.h1`
  font-size: 3.6em;
  text-align: center;
  margin: 0;
`;

const Divider = styled.div`
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
  margin: 60px 0;
`;

const AboutToggle = styled.div`
  position: absolute;
  top: 1.5em;
  left: 2em;
  background: var(--lightgrey);
  color: var(--darkgrey);
  padding: .2em;
  border-radius: 6px;
  opacity: .2;

  &:hover {
    cursor: pointer;
    opacity: 1;
  }
`;

const SettingsToggle = styled.div`
  position: absolute;
  top: 1.5em;
  right: 2em;
  background: var(--lightgrey);
  color: var(--darkgrey);
  padding: .2em;
  border-radius: 6px;
  opacity: .2;

  &:hover {
    cursor: pointer;
    opacity: 1;
  }
`;