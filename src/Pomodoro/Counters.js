import React from 'react';
import TimersContext from './TimersContext';
import styled from 'styled-components';

// displays pomodoros completed and pomodoro goal
export default function Counters() {
  return (
    <TimersContext.Consumer>
      {context => (
      <span>
        <Pomodoros>{context.state.pomodoros}</Pomodoros>
        <Group>
          <Goal>of {context.state.goal}</Goal>
          <Text>pomodoros<br /> completed</Text>
        </Group>
      </span>
      )}
    </TimersContext.Consumer>
  )
}

const Pomodoros = styled.div`
  display: inline-block;
  font-size: 6em;
  color: #999;
  font-weight: 200;
  letter-spacing: -.05em;
`;

const Group = styled.div`
  display: inline-block;
  margin-left: 10px;
`;

const Goal = styled.div`
  font-size: 2.5em;
  text-align: right;
  color: var(--medgrey);
`;

const Text = styled.div`
  font-size: .9em;
  text-align: right;
`;