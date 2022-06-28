'use strict';
require('dotenv').config();

const PORT = process.env.PORT || 3030;

const ioServer  = require('socket.io')(PORT);
//name space
const flightConnection = ioServer.of('/airline');

flightConnection.on('connection', (socket) => {
  socket.on('took-off', tookOffFlight);
  function tookOffFlight(payload){
      console.log(payload) ; 
  }
})

ioServer.on('connection', (socket) => {
  //come from manager
  socket.on('new-flight', newFlight);
  function newFlight(payload){
  console.log(payload) ;
  //emit to pilot in namespace
  flightConnection.emit('new-flight',payload);
  //emit to pilot in general
  ioServer.emit('new-flight',payload);
  }
 //from pilot
  socket.on('arrived', flightArrived);
  function flightArrived(payload){
  console.log(payload) ; 
  //to manager
  ioServer.emit('arrived',payload)
  
  }

});


