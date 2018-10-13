import React, { Component } from 'react';
import styled from 'styled-components';
import Portal from '../Utilities/Portal';
// React Spring to come in here as well

export default class Modal extends Component {
  render() {
    const { children, toggle, on } = this.props;
    return (
      <Portal>
        {on && (
          <ModalWrapper>
            <ModalContent>
              { children }
            </ModalContent>
            <CloseButton 
              onClick={toggle}
            >
              ✕
            </CloseButton>
            <Background onClick={toggle} />
          </ModalWrapper>
        )}
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
  z-index: 100;
  position: absolute;
  right: 10px;
  top: 10px;
  font-size: 2em;

  &:hover {
    color: var(--light-work);
    cursor: pointer;
  }
`;

const ModalContent = styled.div`
  z-index: 100;
  background: var(--faintgrey);
  color: var(--lightgrey);
  min-width: 320px;
  padding: 2rem;
  border-radius: 5px;
`;

const Background = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  background: rgba(0,0,0,.6);
`;