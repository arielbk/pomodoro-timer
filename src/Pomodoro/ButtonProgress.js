// This component is passed state via a Context HOC (bottom)
// Context is accessed via props
// This should be a common HOC for reuse, still haven't figured it out completely
// And this still seems relatively clean...

import React, { Component } from 'react';
import styled from 'styled-components';
import TimersContext from './TimersContext';

class ButtonProgress extends Component {
  handleKeyPress = (e) => {
    if (e.key === ' ') {
      this.props.context.handlePlayPause();
    } else if (e.key === 'Escape') {
      this.props.context.handleReset();
    }
  }

  componentDidMount = () => {
    // this.circle = this.circle.getContext('2d');

    document.addEventListener('keyup', this.props.context.handleKeyPress);
  }

  componentWillUnmount = () => {
    document.removeEventListener('keyup', this.props.context.handleKeyPress);
  }

  componentDidUpdate = () => {
    // requestAnimationFrame(this.progressCircle);
  }

  progressCircle = () => {
    // HTML canvas is not my thing for now and I want to understand what I'm doing full
    // TODO -- implement in pure CSS!
    // this looks like a great article: https://css-tricks.com/building-progress-ring-quickly/
    return null
    // this.cw = this.circle.canvas.width;
    // this.ch = this.circle.canvas.height;
    // this.startPoint = 4.72;

    // const activeTimer = this.props.context.state.activeTimer;
    // const timerName = activeTimer.name;
    // const duration = activeTimer.duration;
    // const timeRemaining = activeTimer.timeRemaining;
    // const progress = (duration - timeRemaining) / duration;

    // let endPoint = ((progress) * Math.PI * 2);
    // this.circle.clearRect(0,0,this.cw,this.ch); // clear canvas every time function is called

    // this.circle.lineWidth = 22; // stroke size
    // if (timerName === 'work') {
    //   this.circle.strokeStyle = '#cf4547'; // var(--lightred)
    // } else if (timerName === 'break') {
    //   this.circle.strokeStyle = '#e2d34e'; // var(--lightorange)
    // } else if (timerName === 'longBreak') {
    //   this.circle.strokeStyle = '#8df37a'; // var(--lightgreen)
    // }

    // this.circle.beginPath();
    // this.circle.arc(76,76,65,this.startPoint,endPoint+this.startPoint); // x, y, radius, start, end

    // this.circle.stroke(); // fill stroke
  }

  render() {
      return (
      <ButtonsContainer>  
        <ResetButton onClick={this.props.context.handleReset}>✕</ResetButton>

        <StyledButtonProgress>
          <ButtonProgressInner>
            <i 
              className={this.props.context.state.activeTimer.paused 
                ? 'fas fa-play' 
                : 'fas fa-pause'}
            />
          </ButtonProgressInner>
        </StyledButtonProgress>

        <ProgressCanvas 
          height="152" 
          width="152" 
          innerRef={comp => this.circle = comp}
          onClick={this.props.context.handlePlayPause}
        />

      </ButtonsContainer>
    );
  }
}

const WithContext = () => (
  <TimersContext.Consumer>
    {context => <ButtonProgress context={context} />}
  </TimersContext.Consumer>
)

export default WithContext;

const ButtonsContainer = styled.div`
  position: relative;
  width: 150px;
  height: 150px;
`;

const ResetButton = styled.div`
  position: absolute;
  top: -15px;
  right: -15px;
  font-size: 40px;
  font-weight: 900;

  &:hover {
    color: var(--light-work);
    cursor: pointer;
  }
`;

const StyledButtonProgress = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 150px;
  height: 150px;
  border-radius: 100%;
  font-size: 64px;
  transition: 1s;

  &:hover {
    cursor: pointer;
  }
`;

const ButtonProgressInner = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  background: var(--darkgrey);
  color: var(--light-work);
  width: 106px;
  height: 106px;
  border-radius: 100%;
  font-size: 1em;
`;

const ProgressCanvas = styled.canvas`
  height: 150px;
  width: 150px;
  border-radius: 100%;

  position: absolute;
  top: 0;
  left:0;
  transition: border .5s;

  &:hover {
    cursor: pointer;
  }
`;

