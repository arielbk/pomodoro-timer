import React, { Component } from 'react';
import styled from 'styled-components';
import Portal from '../Utilities/Portal';
import { Transition, animated, config } from 'react-spring';
// React Spring to come in here as well

export default class Modal extends Component {
  render() {
    const { children, toggle, on, from } = this.props;
    return (
      <Portal>
        <Transition
          
          config={config.gentle}
          from={{ opacity: 0, x: `${from === 'left' ? '-' : ''}400` }}
          enter={{ opacity: 1, x: '0' }}
          leave={{ opacity: 0, x: `${from === 'left' ? '-' : ''}400` }}
        >
        {on && (styles => (
          <ModalWrapper>
            <ModalContent
              style={{
                transform: `translate3d(${Math.floor(styles.x)}px, 0, 0)`,
                opacity: styles.opacity
              }}
            >
              { children }
            </ModalContent>
            <CloseButton 
              onClick={toggle}
            >
              ✕
            </CloseButton>
            <Background 
              onClick={toggle} 
              style={{
                opacity: styles.opacity
              }}
            />
          </ModalWrapper>
        ))}
        </Transition>
      </Portal>
    )
  }
}

const ModalWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const CloseButton = styled.div`
  z-index: 101;
  position: absolute;
  right: 10px;
  top: 10px;
  font-size: 5rem;

  &:hover {
    color: var(--light-work);
    cursor: pointer;
  }
`;

const ModalContent = styled(animated.div)`
  z-index: 100;
  background: var(--faintgrey);
  color: var(--lightgrey);
  min-width: 320px;
  padding: 2rem;
  border-radius: 5px;
`;

const Background = styled(animated.div)`
  position: fixed;
  width: 100vw;
  height: 100vh;
  background: rgba(0,0,0,.6);
`;