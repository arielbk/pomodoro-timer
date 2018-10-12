import React, { Component } from 'react';
import TimersContext from '../TimersContext';

import styled from 'styled-components';
import  { SettingsItem } from './index';

//  settings component - select a sound
export default class SoundSetter extends Component {
  render() {
    return (
      <TimersContext>
        {context => (
          <StyledSoundSetter>

            <Arrow timer={this.props.timerName}
              onMouseDown={() => {
              let newIndex = context.state.sounds
                .indexOf(context.state[this.props.timerName].sound);
      
              if (newIndex < 1 ) { newIndex = context.state.sounds.length-1; }
              else { newIndex-- }
      
              context.handleSoundSelect(context.state.sounds[newIndex]);
              }}>&lt;
            </Arrow>

            <SoundList>
              {context.state.sounds.map(sound => {
                return (
                <li key={`${sound}`}
                  hidden={sound === context.state[this.props.timerName].sound ? false : true}>
                  <SoundIcon onClick={() => context.playSound(sound)}>
                    <i className="fas fa-volume-up"></i>
                  </SoundIcon>
                  {sound}
                </li>)
              })}
            </SoundList>

            <Arrow timer={this.props.timerName}
              onMouseDown={() => {
              let newIndex = context.state.sounds
                .indexOf(context.state[this.props.timerName].sound);
      
              if (newIndex === context.state.sounds.length - 1 ) { newIndex = 0; }
              else { newIndex++ }
      
              context.handleSoundSelect(this.props.timerName, context.state.sounds[newIndex]);
              }}>&gt;
            </Arrow>

            <Progress>
              {context.state.sounds.map((sound, index) => {
                return (
                <ProgressTab 
                  onClick={() => context.handleSoundSelect(context.state.sounds[index])} key={`${sound}`} 
                  active={sound === context.state[this.props.timerName].sound ? true : false }
                  timer={this.props.timerName} />)
              })}
            </Progress>

          </StyledSoundSetter>
        )}
      </TimersContext>
    )
  }
}

// for some weird reason styled components won't let me *just* pass in SettingsItem component... passing it as a callback works though
const StyledSoundSetter = styled(props => <SettingsItem {...props} />)`
  flex-wrap: wrap;
  text-align: center;
  border-bottom: 1px solid var(--faintgrey);
  border-top: 1px solid var(--faintgrey);
  padding-bottom: 15px;
`;

const Arrow = styled.a`
  font-size: 2rem;
  color: var(--darkgrey);

  &:hover {
    cursor: pointer;
  }

  ${StyledSoundSetter}:hover & {
    color: var(--light-${props => props.timer});
  }
`;

const SoundIcon = styled.span`
  display: inline-flex;
  justify-content: center;
  align-items: center;

  background: var(--medgrey);
  padding: 2px;
  width: 1em;
  height: 1em;
  border-radius: 100%;
  margin-right: .5em;
  position: absolute;
  left: 2em;

  ${StyledSoundSetter}:hover & {
    background: var(--lightgrey);
    cursor: pointer;
  }

  & i {
    font-size: .7em;
    color: var(--darkgrey);
  }
`;

const SoundList = styled.ul`
  margin: 0;
  padding: .5em;

  li {
    list-style: none;
    text-align: center;
    padding: .5em 0;

    &:hover {
      cursor: pointer;
      color: var(--lightgrey);
    }

    ${props => props.hidden && 'display: none'}
  }
`;

const Progress = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  height: 12px;
  border-radius: 6px;
  flex-basis: 100%;
  padding-bottom: 15px;
`;

const ProgressTab = styled.div`
  background: var(--medgrey);
  height: 13px;
  width: 13px;
  margin: 0 4px;
  border-radius: 100%;

  &:hover {
    cursor: pointer;
    background: var(--${props => props.active ? 'light' : 'dark'}-${props => props.timer});
  }
`;