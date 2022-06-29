'use strict';
require('dotenv').config();
const PORT = process.env.PORT || 3000;
// const uuid = require('uuid').v4;

const ioServer  = require('socket.io')(PORT);
///add new object///
const queue = {
  flights: {

  }
}

////////airline name space/////////
const flightConnection = ioServer.of('/airline');

flightConnection.on('connection', (socket) => {
  socket.on('took-off', tookOffFlight);
  function tookOffFlight(payload){
      console.log(payload) ; 
  }
})
/////////////ioServer////////////
ioServer.on('connection', (socket) => {
  //come from manager
  socket.on('new-flight', newFlight);
  function newFlight(payload){


     const id = payload.Details.flightID;
    //add payload to object
    queue.flights[id] = payload;
    console.log(payload) ;
    
    flightConnection.emit('new-flight',payload);
    ioServer.emit('new-flight',payload);
  }
 

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

  socket.on('get_all', () => {
    // ['32ennn32323223ijij','42r545ggt66tve4646']
   
    Object.keys(queue.flights).forEach((id) => {
        socket.emit('flight', {
            id: id,
            payload: queue.flights[id]
        });
        // console.log("*******content of queue*****",queue.flights) ;
    })
  })

  socket.on('delete', (flight) => {
    //this will remove the flight from the queue
    delete queue.flights[flight.id];
  })
  

});


