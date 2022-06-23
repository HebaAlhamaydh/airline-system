'use strict';
const events = require('../event');
const { faker } = require('@faker-js/faker');

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
    events.emit('new-flight', Flight);
}, 10000)

events.on('arrived', flightArrived);
function flightArrived(Flight){
    console.log(`Manager: we’re greatly thankful for the amazing flight, ${Flight.Details.pilot}`);
}

