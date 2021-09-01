const express = require('express');
const routing = express.Router();
const swimController = require('../Controller/swim.js');
const runController = require('../Controller/run.js');
const bikeController = require('../Controller/bike.js');
const userController = require('../Controller/user');

// CRUD operations w user controller
routing.post('/user', userController.createUser);
routing.post('/user/login', userController.userLogin);
routing.get('/user', userController.getUsers);
routing.put('/user', userController.updateUser);

routing.delete('/deleteAllUsers', userController.deleteAllUsers);

// CRUD operations associated with bike controller
routing.get('/bikes', bikeController.getBikes);
routing.get('/bikeById', bikeController.getBikeById);
routing.post('/bikes', bikeController.newBike);
routing.put('/bikes/:id', bikeController.updateBike);
routing.delete('/bikes', bikeController.deleteBike);
routing.delete('/deleteAllBikes', bikeController.deleteAllBikes);

// CRUD operations associated with run controller
routing.get('/runs/:user', runController.getRuns);
routing.get('/runById', runController.getRunById);
routing.post('/runs', runController.newRun);
routing.put('/runs/:id', runController.updateRun);
routing.delete('/runs', runController.deleteRun);
routing.delete('/deleteAllRuns', runController.deleteAllRuns);

// CRUD operations associated with swim controller
routing.get('/swims', swimController.getSwims);
routing.get('/swimById', swimController.getSwimById);
routing.post('/swims', swimController.newSwim);
routing.put('/swims/:id', swimController.updateSwim);
routing.delete('/swims', swimController.deleteSwims);
routing.delete('/deleteAllSwims', swimController.deleteAllSwims);

// for all other invalid paths
routing.all('*', bikeController.invalid);

module.exports = routing;
