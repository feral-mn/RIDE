import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser'
import morgan from'morgan'
import connectDB from './db.js';
import userRouter from './routes/user.route.js';
import captainRouter from './routes/captain.route.js';
import mapRouter from './routes/maps.route.js';
import rideRouter from './routes/ride.route.js';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser()) // for pauthenticateJWTarsing cookies
app.use(morgan('dev')) // for logging requests
connectDB();// Connect to MongoDB

app.use('/api/v1/user', userRouter); // User routes
app.use('/api/v1/captain', captainRouter); // Captain routes
app.use('/api/v1/maps', mapRouter); // Maps routes
app.use('/api/v1/ride', rideRouter); // Ride routes

app.get('/test', (req, res) => {
    res.json({ message: "Hello from test endpoint!" });
});

app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is running on port ${process.env.PORT || 3000}`);
})

