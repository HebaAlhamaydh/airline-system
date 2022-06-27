'use strict';
require('dotenv').config();
const { faker } = require('@faker-js/faker');

const io = require('socket.io-client');
let host = `http://localhost:${process.env.PORT}/`;
//client connected to server
const systemConnection = io.connect(host);

setInterval(() => {
    let name = faker.name.findName();
    let recentDate = faker.date.future();
    let flightID =faker.datatype.uuid();
    const destinationC=faker.address.city();
    let destination=faker.address.country();
    let Flight={
               event:'new-flight', 
               time: `${recentDate}`,
        Details:{
            airLine:'Royal Jordinian Airlines', 
            flightID: `${flightID}`,  
            pilot:`${name}`, 
            destination:`${destinationC}, ${destination}`
               } 
            };
            
    console.log(`Manager: new flight with ID ${Flight.Details.flightID} have been scheduled`) ;
    systemConnection.emit('new-flight', Flight);
}, 10000)

systemConnection.on('arrived', flightArrived);
function flightArrived(Flight){
    console.log(`Manager: we’re greatly thankful for the amazing flight, ${Flight.Details.pilot}`);
}

