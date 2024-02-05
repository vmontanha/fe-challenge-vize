
const EventEmitter = require('events');

module.exports = (on, config) => {
  const customEventEmitter = new EventEmitter();

  on('task', {
    emitCustomEvent: () => {
      customEventEmitter.emit('customEvent');
      return null; // Tasks must return something, so we return null
    },
  });

  // Your other plugin configurations
  // ...

  return config;
};
