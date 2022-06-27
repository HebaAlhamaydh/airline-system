'use strict';
require('dotenv').config();

const PORT = process.env.PORT || 3030;

const ioServer  = require('socket.io')(PORT);
//name space
const flightConnection = ioServer.of('/airline');

// flightConnection.on('connection', (socket) => {

// }
// })

ioServer.on('connection', (socket) => {
  socket.on('new-flight', newFlight);
  function newFlight(payload){
  console.log(payload) ;
  ioServer.emit('new-flight',payload);
 
  }
 
  socket.on('took-off', tookOffFlight);
  function tookOffFlight(payload){
      console.log(payload) ; 
  }
  

  socket.on('arrived', flightArrived);
  function flightArrived(payload){
  console.log(payload) ; 
  ioServer.emit('arrived',payload)
  
  }

});


