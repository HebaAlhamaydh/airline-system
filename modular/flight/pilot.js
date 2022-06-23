'use strict';
const events = require('../event');


events.on('new-flight', newFlight);
function newFlight(Flight){
    
setInterval(() => {
    Flight.event='took-off';
    console.log(`Pilot: flight with ID ${ Flight.Details.flightID} took-off`) ;
    events.emit('took-off', Flight);
}, 4000)
setInterval(() => {
    Flight.event='arrived';
    console.log(`Pilot: flight with ID ${ Flight.Details.flightID} has arrived`) ;
    events.emit('arrived', Flight);
}, 7000)}
