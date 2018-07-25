// TODO:
// responsiveness for smaller screens and mobile-specific features
// timer can be made more efficient and milliseconds added
// refactor CSS
// local storage for user settings
// access icons locally? Font awesome adds to load time but users may have it cached...
// also - google fonts to local

import React from 'react';
import Pomodoro from './Pomodoro';

const App = () => (
  <div>
    <Pomodoro />
  </div>
)

export default App;