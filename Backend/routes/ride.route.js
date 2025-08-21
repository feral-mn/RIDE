import express from 'express';
const rideRouter = express.Router();
import {createRide} from '../controllers/ride.controller.js';
import authenticateJWT from '../middlewares/authenticate.middleware.js';

rideRouter.post('/create-ride',authenticateJWT ,createRide);

export default rideRouter;