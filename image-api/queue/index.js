// index.js

const EventEmitter = require('events');
const qEmitter = new EventEmitter();
const processQ = [];
const doneQ = [];

qEmitter.on('add-item', id => {
  processQ.push(id);
}

qEmitter.on('process-item', index => {
  let id = processQ[index];
  processQ.splice(index, 1);
  doneQ.push(id);
})

setInterval(() => {
  for(var i = 0; i < 5; i++){
    if(processQ[i]){
      qEmitter.emit('process-item', i.toString());
    }
  }
}, 1000);

module.exports = {
  processQ: [],
  doneQ: [],
  emitter: qEmitter
}
