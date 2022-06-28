'use strict';
// const events = require('../event');
require('dotenv').config();
const io = require('socket.io-client');

//name space
let host = `http://localhost:${process.env.PORT}/airline`;
const nameSpaceConnection = io.connect(host);
//emit new flight come from system in namespace
nameSpaceConnection.on('new-flight', newFlight);
function newFlight(Flight){
setTimeout(() => {
    Flight.event='took-off';
    console.log(`Pilot: flight with ID ${ Flight.Details.flightID} took-off`) ;
    //for system in name space
    nameSpaceConnection.emit('took-off', Flight);
}, 4000)
}

//general server
let host2 = `http://localhost:${process.env.PORT}/`;
const systemConnection2 = io.connect(host2);
//come from system in general server
systemConnection2.on('new-flight', newFlight2);
function newFlight2(Flight){
setTimeout(() => {
    Flight.event='arrived';
    console.log(`Pilot: flight with ID ${ Flight.Details.flightID} has arrived`) ;
    //for system in general
    systemConnection2.emit('arrived', Flight);
}, 7000)}
