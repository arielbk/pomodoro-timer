import React from 'react';
import ReactDOM from 'react-dom';
import Pomodoro from './Pomodoro';
import './global.css';
import './media-queries.css';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Pomodoro />, document.getElementById('root'));
registerServiceWorker();
