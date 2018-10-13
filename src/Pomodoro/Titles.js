import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import TimersContext from './TimersContext';

export default class Titles extends Component {
  render() {
    return (
      <TimersContext>
        {context => (
        <Fragment>
          <Container>
            <Title
              active={context.state.activeTimer.name === 'work' ? true : false}>
              Work
            </Title>
            <Title
              active={context.state.activeTimer.name === 'break' ? true : false} >
              Break
            </Title>
            <Title
              active={context.state.activeTimer.name === 'longBreak' ? true : false} >
              Long Break
            </Title>
          </Container>
          <Container>
            <Underline 
              timer='work' 
              active={context.state.activeTimer.name === 'work' ? true : false} 
            />
            <Underline 
              timer='break'
              active={context.state.activeTimer.name === 'break' ? true : false} 
            />
            <Underline 
              timer='longBreak'
              active={context.state.activeTimer.name === 'longBreak' ? true : false} 
            />
          </Container>
        </Fragment>
        )}
      </TimersContext>
    )
  }
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

const Title = styled.div`
  text-transform: lowercase;
  font-family: 'Rubik';
  font-size: 1.5rem;
  font-weight: 700;
  display: inline-block;
  width: 30%;
  height: 45px;
  text-align: center;
  padding: .4em;
  position: relative;
  color: var(--${props => props.active ? 'light' : 'med'}grey);
`;

const Underline = styled.div`
  width: 30%;
  height: 5px;
  border-radius: 5px;
  background: var(--${props => props.active ? `light-${props.timer});` : 'faintgrey);'}
`;