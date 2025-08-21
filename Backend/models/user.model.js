import {Schema, model} from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


const userSchema = new Schema({
    firstname:{
        type: String,
        required: [true, 'First name is required'],
        trim: true,
        minlength: [2, 'First name must be at least 2 characters long'],
        maxlength: [50, 'First name must be at most 50 characters long']
    },
    lastname:{
        type: String,
        required: [true, 'Last name is required'],
        trim: true,
        minlength: [2, 'Last name must be at least 2 characters long'],
        maxlength: [50, 'Last name must be at most 50 characters long']
    },
    email:{
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        trim: true,
        lowercase: true,
        match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address']
    },
    password:{
        type: String,
        required: [true, 'Password is required'],
        minlength: [6, 'Password must be at least 6 characters long'],
        select: false // Do not return password in queries
    },
    socketId: {
        type: String,
        default: null
    },
})

userSchema.methods = {
    generateJWT: async function() {
        const token = await jwt.sign({id: this._id, email: this.email}, process.env.JWT_SECRET, {expiresIn: '3h'});
        return token;
    },
    comparePassword: async function(password){
        return await bcrypt.compare(password, this.password);
    }
}

userSchema.post('save', async function(doc, next) {
    try{
        const token = await doc.generateJWT();
        doc.token = token; // Add token to the document
        next();
    }
    catch(err) {
        next(err);
    }
})

userSchema.pre('save', async function(next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

const userModel = model('user', userSchema);

export default userModel;