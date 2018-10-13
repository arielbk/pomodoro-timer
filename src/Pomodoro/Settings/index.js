import React, { Component } from 'react';
import styled from 'styled-components';

import GoalSetter from './GoalSetter';
import LongBreakSetter from './LongBreakSetter';
import SoundSetter from './SoundSetter';
import TimeSetter from './TimeSetter';

// container and title for timers' settings component
export default class Settings extends Component {
  render() {
    return (
      <Container>

        <Group timer="work">
          <Title timer="work" onClick={this.props.onSettingsToggle}>Work</Title>
          <Content>
            <TimeSetter timerName="work" />
            <SoundSetter timerName="work" />
            <GoalSetter timerName="work" />
          </Content>
        </Group>
        
        <Group timer="break">
          <Title timer="break" onClick={this.props.onSettingsToggle}>Break</Title>
          <Content>
            <TimeSetter timerName="break" />
            <SoundSetter timerName="break" />
          </Content>
        </Group>

        <Group timer="longBreak">
          <Title timer="longBreak" onClick={this.props.onSettingsToggle}>Long Break</Title>
          <Content>
            <TimeSetter timerName="longBreak" />
            <SoundSetter timerName="longBreak" />
            <LongBreakSetter timerName="longBreak" />
          </Content>
        </Group> 

      </Container>
  )}
}
const Container = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: flex-start;
  width: 800px;

  color: var(--darkgrey);
  border-radius: 6px;
  opacity: .9;

  transition: .4s;
`;

const Title = styled.div`
  text-transform: lowercase;
  display: inline-block;
  transition: color .5s;
  width: 100%;
  height: 45px;
  text-align: center;
  padding: .4em;
  border-bottom: 6px solid var(--medgrey);
  color: var(--lightgrey);
  position: relative;
`;

const Group = styled.div`
  &:hover ${Title} {
    cursor: pointer;
    color: var(--lightgrey);
    border-bottom: 
      6px solid var(--light-${props => props.timer}) !important;
  }
`;

// this is the component that will be toggled...
const Content = styled.div`
  // max-height: 0;
  overflow: hidden;
`;

// this is not used in this component - for export
const SettingsItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  transition: color 0.2s;
  margin: 1em 0;
  border-bottom: 3px solid var(--darkgrey);
  text-transform: lowercase;
  width: 220px;
  position: relative;

  &:hover {
    color: var(--lightgrey);
  }
`;

const IncrementDecrement = styled.a`
  border: none;
  background: transparent;
  font-weight: 100;
  font-size: 2rem;

  &:hover {
    cursor: pointer;
    font-weight: bold;
  }

  ${Group} ${SettingsItem}:hover & {
    opacity: 1;
    color: var(--light-${props => props.timer})
  }
`;

// export styles for use in other settings components
export { Container, Title, Group, Content, SettingsItem, IncrementDecrement };
