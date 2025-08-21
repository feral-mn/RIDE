import {Schema, model} from 'mongoose';

const rideSchema = new Schema({
    user:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    captain:{
        type: Schema.Types.ObjectId,
        ref: 'Captain',
    },
    pickup:{
        type: String,
        required: true
    },
    destination:{
        type: String,
        required: true
    },
    fare:{
        type: Number,
        required: true
    },
    status:{
        type: String,
        enum: ['pending', 'accepted', 'in-progress', 'completed', 'cancelled'],
        default: 'pending'
    },
    duration:{
        type: Number,

    },//in seconds
    distance:{
        type: Number,
    },//in metres
    paymentId:{
        type: String,
    },
    orderId:{
        type: String,
    },
    paymentStatus:{
        type: String,
        enum: ['pending', 'completed', 'failed'],
        default: 'pending'
    },
    signature:{
        type: String,
    },
    otp:{
        type: String,
        select: false 
    }

},{timestamps: true});

const rideModel = model('ride', rideSchema);

export default rideModel;