import React, { Component } from 'react';
import styled from 'styled-components';

export default class About extends Component {
  render() {
    return (
      <Container>
        <p>The Pomodoro Technique is a tool for time management and productivity.</p>
        <p>Work for one 'pomodoro' (one set interval — usually 25 minutes) and then have a short break. After 4 of these, go and have a long break. It's simple and effective for flow, focus and productivity.</p>
        <p>The Pomodoro Technique has been around since the 1980s, and was developed by Francesco Cirillo. Find out more about it on the <a href="https://en.wikipedia.org/wiki/Pomodoro_Technique">Wikipedia page</a>.</p>
      </Container>
    )
  }
}

const Container = styled.div`
  max-width: 600px;
`;