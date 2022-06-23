'use strict';
const events = require('./modular/event');
require('./modular/flight/manager');
require('./modular/flight/pilot');


events.on('new-flight', newFlight);
function newFlight(payload){
  console.log(payload) ; 
}

events.on('took-off', tookOffFlight);
function tookOffFlight(payload){
    console.log(payload) ; 
}

events.on('arrived', flightArrived);
function flightArrived(payload){
console.log(payload) ;   
}
