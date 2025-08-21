import rideModel from '../models/ride.model.js';
import mapsServices from './maps.services.js';
import crypto from 'crypto';

function getOtp(num){
 function genrateOtp(num){
    try {
        const otp = crypto.randomInt(Math.pow(10,num-1),Math.pow(10,num)).toString();
        return otp;
    } catch (error) {
        console.error('Error generating OTP:', error);
        throw new Error('Failed to generate OTP');
    }
}
    return genrateOtp(num);
}

async function getFare(pickup, destination) {
    try {
        if (!pickup || !destination) {
            throw new Error('Pickup and destination addresses are required.');
        }

        const result = await mapsServices.getDirections(pickup, destination);
        const distance = result.distances[0][1]/1000; // Convert meters to kilometers
        const duration = result.durations[0][1]/60; // Convert seconds to minutes
        console.log(`Distance: ${distance} km, Duration: ${duration} minutes`);
        if (distance === undefined || duration === undefined) {
            throw new Error('Invalid response from directions service.');
        }

        const baseFare = {
            car: 50,
            bike: 30,
            auto: 40
        };
        const perKmRate = {
            car: 12,
            bike: 8,
            auto: 10
        };
        const perMinRate = {
            car: 2,
            bike: 1,
            auto: 1.5
        };

        const fare = {
            car: baseFare.car + (perKmRate.car * distance) + (perMinRate.car * duration),
            bike: baseFare.bike + (perKmRate.bike * distance) + (perMinRate.bike * duration),
            auto: baseFare.auto + (perKmRate.auto * distance) + (perMinRate.auto * duration),
            distance: distance,
            duration: duration
        };

        return fare;

    } catch (error) {
        console.error('Error calculating fare:', error);
        throw new Error('Failed to calculate fare');
    }
}

async function createRide(pickup, destination, user, vehicleType) {
    try {
        if (!pickup || !destination || !user || !vehicleType) {
            throw new Error('Pickup, destination, user, and vehicle type are required.');
        }

        const fare = await getFare(pickup, destination);
        console.log('Fare calculated:', fare);
        // const directionsDuration = await mapsServices.getDirections(pickup, destination);

        const ride = new rideModel({
            user,
            pickup,
            destination,
            fare: fare[vehicleType],
            status: 'pending',
            duration: fare.duration, 
            distance: fare.distance,
            otp: getOtp(4),
        });

        const savedRide = await ride.save();
        return savedRide;

    } catch (error) {
        console.error('Error creating ride:', error);
        throw new Error('Failed to create ride');
    }
}

export default {getFare, createRide};