import {Router} from 'express';
import validate from '../middlewares/validate.middleware.js';
import {register, login, profile, logout} from '../controllers/user.controller.js';
import authenticateJWT from '../middlewares/authenticate.middleware.js';


const userRouter = Router();

userRouter.post('/register', validate, register)
userRouter.post('/login', validate, authenticateJWT, login);
userRouter.get('/profile', authenticateJWT, profile)
userRouter.get('/logout', authenticateJWT, logout); 

export default userRouter;