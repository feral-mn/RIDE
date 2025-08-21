import {Schema, model} from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


const captainSchema = new Schema({
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
    status:{
        type: String,
        enum: ['active', 'inactive', 'busy'],
        default: 'inactive'
    },
    vehicle:{
        color:{
            type: String,
            //required: [true, 'Vehicle color is required'],
            trim: true
        },
        numberPlate:{
            type: String,
            //required: [true, 'Vehicle number plate is required'],
            trim: true,
            unique: true
        },
        type:{
            type: String,
            //required: [true, 'Vehicle type is required'],
            enum: ['car', 'bike', 'auto'],
        },
        model:{
            type: String,
            //required: [true, 'Vehicle model is required'],
            trim: true
        },
        capacity:{
            type: Number,
            //required: [true, 'Vehicle capacity is required'],
            min: [2, 'Vehicle capacity must be at least 2']
        }
    },
    location:{
        latitude: {
            type: Number
        },
        longitude: {
            type: Number
        }
    }
})

captainSchema.methods = {
    generateJWT: async function() {
        const token = await jwt.sign({id: this._id, email: this.email}, process.env.JWT_SECRET, {expiresIn: '3h'});
        return token;
    },
    comparePassword: async function(password){
        return await bcrypt.compare(password, this.password);
    }
}

captainSchema.post('save', async function(doc, next) {
    try{
        const token = await doc.generateJWT();
        doc.token = token; // Add token to the document
        next();
    }
    catch(err) {
        next(err);
    }
})

captainSchema.pre('save', async function(next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

const captainModel = model('captain', captainSchema);

export default captainModel;