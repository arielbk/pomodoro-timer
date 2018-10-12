import React, { Component } from 'react';
import TimersContext from '../TimersContext';
import GoalSetter from './GoalSetter';
import LongBreakSetter from './LongBreakSetter';
import SoundSetter from './SoundSetter';
import TimeSetter from './TimeSetter';

import styled from 'styled-components';

// container and title for timers' settings component
export default class Settings extends Component {
  render() {
    return (
      <TimersContext>
        {context => (
          <Container 
            onMouseOver={() => this.props.onSettingsToggle('show')} 
            onMouseOut={() => this.props.onSettingsToggle('hide')}
          >

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
    </TimersContext>
  )}
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
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
  position: relative;

  &::after {
    content: '▾';
    position: absolute;
    right: 1em;
  }
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
  color: var(--darkgrey);

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
