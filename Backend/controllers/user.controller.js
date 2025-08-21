import userModel from '../models/user.model.js';
import blacklistedTokenModel from '../models/token.model.js';
const cookieOptions = {
    maxAge: 24*60*60*1000,
    httpOnly: true,
    secure: false, // change to true for production
    sameSite: 'Lax'
}
//Implement true atomicity ny using mongoose transaction 
async function register(req, res){
    const {firstname, lastname, email, password} = req.body;
    try{
        const user = await userModel.create({firstname, lastname, email, password});
        const token = user.token;
        return res.status(201)
            .cookie('token', token, cookieOptions)
            .json({
                message: "User registered successfully",
                token: token,
                user: {
                    id: user._id,
                    firstname: user.firstname,
                    lastname: user.lastname,
                    email: user.email
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
            message: "Error during user registration:",
            error: err.message
        });
        console.error("Error during user registration:", err)
    }
}

async function login(req, res){
    const {email, password} = req.body;
    try{
        if(req.isAuthenticated){
            return res.status(201)
            .json({
                message: "User already is login",
            })
        }
        const user = await userModel.findOne({ email }).select('+password');
        if(!user) return res.status(404).json({ message: "User not found" });
        const isMatch = await user.comparePassword(password);
        if(!isMatch) return res.status(401).json({ message: "Incorrect Password" });
        const token = await user.generateJWT();
        return res.status(201)
            .cookie('token', token, cookieOptions)
            .json({
                message: "User login successfull",
                token: token,
                user: {
                    id: user._id,
                    firstname: user.firstname,
                    lastname: user.lastname,
                    email: user.email
                }
            })
    }
    catch(err){
        return res.status(500).json({
            message: "Error during user login:",
            error: err.message
        });
        console.error("Error during user login:", err);
    }
}

async function profile(req, res){
    const user = req.user;
    return res.status(200).json({
        message: "User profile fetched successfully",
        user: {
            id: user._id,
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email
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