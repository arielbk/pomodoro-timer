import React, { Component } from 'react';
import styled from 'styled-components';

import {
  Container, Title, Group, Content, SettingsItem,
} from './Styles';

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
    );
  }
}
