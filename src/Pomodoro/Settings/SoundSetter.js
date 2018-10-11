import React, { Component } from 'react';
import TimersContext from '../TimersContext';
import './css/soundSetter.css';

//  settings component - select a sound
class SoundSetter extends Component {
  render() {
    return (
      <TimersContext>
        {context => (
          <div className={`settings-item settings-sound`} >
            <a className='sound-prev-arrow noselect' onMouseDown={() => {
              let newIndex = context.state.sounds
                .indexOf(context.state[this.props.timerName].sound);
      
              if (newIndex < 1 ) { newIndex = context.state.sounds.length-1; }
              else { newIndex-- }
      
              context.handleSoundSelect(context.state.sounds[newIndex]);
            }}>&lt;</a>
              <ul className='sound-list'>
                {context.state.sounds.map(sound => {
                  return <li key={`${sound}`} className={sound === context.state[this.props.timerName].sound ? 'sound-active' : 'sound-hidden'}><span className='sound-icon' onClick={() => context.onSampleSound(this.props.timerName)}><i className="fas fa-volume-up"></i></span> {sound}</li>
                })}
              </ul>
            <a className='sound-next-arrow noselect' onMouseDown={() => {
              let newIndex = context.state.sounds
                .indexOf(context.state[this.props.timerName].sound);
      
              if (newIndex === context.state.sounds.length - 1 ) { newIndex = 0; }
              else { newIndex++ }
      
              context.handleSoundSelect(context.state.sounds[newIndex]);
            }}>&gt;</a>
            <div className='sound-progress'>
              {context.state.sounds.map((sound, index) => {
                return <div onClick={() => context.handleSoundSelect(context.state.sounds[index])} key={`${sound}`} className={sound === context.state[this.props.timerName].sound ? 'sound-progress-tab sound-progress-tab-active' : 'sound-progress-tab'}></div>
              })}
            </div>
          </div>
        )}
      </TimersContext>
    )
  }
}

export default SoundSetter;