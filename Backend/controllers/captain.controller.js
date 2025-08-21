import captainModel from '../models/captain.model.js';
import blacklistedTokenModel from '../models/token.model.js';
const cookieOptions = {
    maxAge: 24*60*60*1000,
    httpOnly: true,
    secure: false, // change to true for production
    sameSite: 'Lax'
}
//Implement true atomicity ny using mongoose transaction 
async function register(req, res){
    const {firstname, lastname, email, password, color, numberPlate, type, model, capacity} = req.body;
    try{
        const captain = await captainModel.create({firstname, lastname, email, password, vehicle: {color, numberPlate, type, model, capacity}});
        const token = captain.token;
        return res.status(201)
            .cookie('token', token, cookieOptions)
            .json({
                message: "captain registered successfully",
                token: token,
                captain: {
                    id: captain._id,
                    firstname: captain.firstname,
                    lastname: captain.lastname,
                    email: captain.email,
                    vehicle: {
                        color: captain.vehicle.color,
                        numberPlate: captain.vehicle.numberPlate,
                        type: captain.vehicle.type,
                        model: captain.vehicle.model,
                        capacity: captain.vehicle.capacity
                    }
                }
            })
    }
    catch(err){
        if(err.code === 11000){
            // Duplicate key error
            return res.status(400).json({
                message: "Email already exists",
                error: err.message
            });
        }
        return res.status(500).json({
            message: "Error during captain registration:",
            error: err.message
        });
        console.error("Error during captain registration:", err)
    }
}

async function login(req, res){
    const {email, password} = req.body;
    try{
        if(req.isAuthenticated){
            return res.status(201)
            .json({
                message: "Captain already is login",
            })
        }
        const captain = await captainModel.findOne({ email }).select('+password');
        if(!captain) return res.status(404).json({ message: "captain not found" });
        const isMatch = await captain.comparePassword(password);
        if(!isMatch) return res.status(401).json({ message: "Incorrect Password" });
        const token = await captain.generateJWT();
        return res.status(201)
            .cookie('token', token, cookieOptions)
            .json({
                message: "Captain login successfull",
                token: token,
                captain: {
                    id: captain._id,
                    firstname: captain.firstname,
                    lastname: captain.lastname,
                    email: captain.email,
                    vehicle: {
                        color: captain.vehicle.color,
                        numberPlate: captain.vehicle.numberPlate,
                        type: captain.vehicle.type,
                        model: captain.vehicle.model,
                        capacity: captain.vehicle.capacity
                    }
                }
            })
    }
    catch(err){
        return res.status(500).json({
            message: "Error during captain login:",
            error: err.message
        });
        console.error("Error during captain login:", err);
    }
}

async function profile(req, res){
    const captain = req.user;
    return res.status(200).json({
        message: "captain profile fetched successfully",
        captain: {
            id: captain._id,
            firstname: captain.firstname,
            lastname: captain.lastname,
            email: captain.email,
            vehicle: {
                        color: captain.vehicle.color,
                        numberPlate: captain.vehicle.numberPlate,
                        type: captain.vehicle.type,
                        model: captain.vehicle.model,
                        capacity: captain.vehicle.capacity
                    }
        }
    });
}

function logout(req, res){
    console.log('logout')
    const token = req.cookies.token || req.headers.authorization.split(' ')[1];
    blacklistedTokenModel.create({ token });
    res.clearCookie('token', null, {maxAge: 0, httpOnly: true, secure: true})
    .status(200)
    .json({
        success: true,
        message: 'Logged out successfully'
    })
 }
export { register, login, profile, logout };