import {Schema, model} from 'mongoose';

const blacklistedTokenSchema = new Schema({
    token: {
        type: String,
        required: true,
        unique: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 10800   
    }
});

const blacklistedTokenModel = model('blacklistedToken', blacklistedTokenSchema);

export default blacklistedTokenModel;