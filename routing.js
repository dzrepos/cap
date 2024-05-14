const express = require('express');

const routing = express.Router();
const services = require('../Controller/services');
routing.get('/users/booking/:userId', services.viewAppointmentDetails);


routing.post('/users', services.userRegister);

routing.all('*', services.invalid);

routing.get('/users', services.viewUsers);

routing.post('/users/login', services.userLogin);

// Define a GET route for path '/users/booking/:userId' and invoke 'viewAppointmentDetails' function from services.js.
 
// Define a POST route for path '/users/booking/:userId' and invoke 'confirmAppointment' function from services.js.
routing.post('/users/booking/:userId', services.confirmAppointment);



module.exports = routing;
