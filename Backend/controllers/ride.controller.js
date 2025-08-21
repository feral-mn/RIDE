import rideServices from '../services/ride.services.js';
function createRide(req, res) {
    const { pickup, destination, vehicleType } = req.body;

    if (!pickup || !destination || !vehicleType) {
        return res.status(400).json({ error: 'Pickup, destination, user, and vehicle type are required.' });
    }

    rideServices.createRide(pickup, destination, req.user._id, vehicleType)
        .then(ride => res.status(201).json(ride))
        .catch(error => {
            console.error('Error creating ride:', error);
            res.status(500).json({ error: 'Failed to create ride' });
        });
}

export { createRide };