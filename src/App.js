// TODO: clean design for settings
// responsiveness for smaller screens and mobile-specific features
// timer can be made more efficient and milliseconds added
// make function to change styles to reflect an active timer
// refactor CSS
// local storage for user settings
// access icons locally? Font awesome adds to load time but users may have it cached...
// also - google fonts to local
// allow for multiple sounds at once (the next will not currently play when sampling)

import React from 'react';
import Pomodoro from './Pomodoro';

const App = () => (
  <div>
    <Pomodoro />
  </div>
)

export default App;