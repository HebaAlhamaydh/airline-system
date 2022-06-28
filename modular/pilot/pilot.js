'use strict';
// const events = require('../event');
require('dotenv').config();
const io = require('socket.io-client');

//name space
let host = `http://localhost:${process.env.PORT}/airline`;
const nameSpaceConnection = io.connect(host);

nameSpaceConnection.on('new-flight', newFlight);
function newFlight(Flight){
setTimeout(() => {
    Flight.event='took-off';
    console.log(`Pilot: flight with ID ${ Flight.Details.flightID} took-off`) ;
    nameSpaceConnection.emit('took-off', Flight);
}, 4000)
}
let host2 = `http://localhost:${process.env.PORT}/`;
const systemConnection2 = io.connect(host2);

systemConnection2.on('new-flight', newFlight2);
function newFlight2(Flight){
    // setTimeout(() => {
    //         Flight.event='took-off';
    //         console.log(`Pilot: flight with ID ${ Flight.Details.flightID} took-off`) ;
    //         systemConnection2.emit('took-off', Flight);
    //     }, 4000)

setTimeout(() => {
    Flight.event='arrived';
    console.log(`Pilot: flight with ID ${ Flight.Details.flightID} has arrived`) ;
    systemConnection2.emit('arrived', Flight);
}, 7000)}
