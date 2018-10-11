import React, { Component, Fragment } from 'react';
import styled from 'styled-components';

export default class About extends Component {
  render() {
    return (
      <Fragment>
        <AboutToggle onClick={this.props.onAboutToggle}>about</AboutToggle>
        <AboutPomodoro>
          <p>The Pomodoro Technique is a tool for time management and productivity.</p>
          <p>Work for one 'pomodoro' (one set interval — usually 25 minutes) and then have a short break. After 4 of these, go and have a long break. It's simple and effective for flow, focus and productivity.</p>
          <p>The Pomodoro Technique has been around since the 1980s, and was developed by Francesco Cirillo. Find out more about it on the <a href="https://en.wikipedia.org/wiki/Pomodoro_Technique">Wikipedia page</a>.</p>
          <CloseButton 
            onClick={this.props.onAboutToggle}
          >✕</CloseButton>
        </AboutPomodoro>
      </Fragment>
    )
  }
}

const AboutToggle = styled.div`
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

const AboutPomodoro = styled.div`
  position: absolute;
  top: 6em;
  /* full width minus margins on either side... */
  width: calc(100% - 120px);
  background: var(--lightgrey);
  color: var(--darkgrey);
  border-radius: 6px;
  max-height: 0;
  overflow: hidden;
  opacity: .9;

  transition: .4s;
`;

const CloseButton = styled.div`
  position: absolute;
  right: 10px;
  top: 10px;
  font-size: 2em;

  &:hover {
    color: var(--lightred);
    cursor: pointer;
  }
`;