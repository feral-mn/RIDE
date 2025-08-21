import {Router} from 'express';
import validate from '../middlewares/validate.middleware.js';
import {register, login, profile, logout} from '../controllers/captain.controller.js';
import authenticateJWT from '../middlewares/captainauthenticate.middleware.js';


const captainRouter = Router();

captainRouter.post('/register', validate, register)
captainRouter.post('/login', validate, authenticateJWT, login);
captainRouter.get('/profile', authenticateJWT, profile)
captainRouter.get('/logout', authenticateJWT, logout); 

export default captainRouter;