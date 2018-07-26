# Pomodoro Timer

Demo: [https://arielbk.com/pomodorotimer](https://arielbk.com/pomodorotimer)

All relevant JavaScript files can be found inside the [Pomodoro component folder](https://github.com/arielbk/pomodoro-timer/tree/master/src/Pomodoro).

All state, as well as top-level timer functions are inside of the index.js file there. View.js is something like a view controller that contains all UI elements.

All relevant functions live inside their components, changing state with the `changeState()` prop passed down to each, handled by `setState()` inside of index.js.

I have refactored this to the point that I have basically rewritten everything twice as I learn, and I will probably be making many more changes to it. Here are a few things I would like to do:
- shift from a clunky and unportable CSS file to using styled components within JS
- allow users to save timer settings to localstorage