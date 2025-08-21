import userModel from "../models/user.model.js";
import blacklistedTokenModel from "../models/token.model.js";
import jwt from "jsonwebtoken";
async function authenticateJWT(req, res, next){
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    //If token is blacklisted
    const isBlacklistedToken = await blacklistedTokenModel.findOne({ token });
    if(isBlacklistedToken){
        res.clearCookie('token');
        return res.status(401).json({"message" : "You are not authenticated, please login first"});
    }
    //If token is not present and user is trying to access login route
    if(!token && req.path === '/login'){
        req.isAuthenticated = false;
        return next();
    }
    
    if(!token){
        return res.status(401).json({"message" : "You are not authenticated, please login first"});
    }
    //If token is present
    //Verifying the token
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findById(decoded.id).select('-password');
    //If token exists but user not found
    if(!user){
        res.clearCookie('token');
        return res.status(401).json({"message" : "User not found go and register"})
    }
    //If user is found, attach user to request object
    req.user = user;
    req.isAuthenticated = true;
    next(); 
}

export default authenticateJWT;