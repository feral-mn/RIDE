import mapsServices from "../services/maps.services.js";

async function getCoordinates(req, res) {
    const address = req.query.address;

    if (!address) {
        return res.status(400).json({ message: "Address is required." });
    }

    try {
        const eloc = await mapsServices.getCoordinates(address);
        console.log(eloc)

        if (eloc) {
            return res.status(200).json(eloc);
        } else {
            // This case handles when the service returns null (no results found)
            return res.status(404).json({ message: "Coordinates not found for the given address." });
        }
    } catch (error) {
        // Log the error for server-side debugging
        console.error('Error in maps.controller.js - getCoordinates:', error.message);

        // Provide a more user-friendly error message to the client
        // You can customize these based on the `error.message` if you throw specific error types from the service
        if (error.message.includes("Failed to obtain MapmyIndia access token")) {
            return res.status(500).json({ message: "Service temporarily unavailable due to authentication issue. Please try again later." });
        }
        if (error.message.includes("MapmyIndia CLIENT_ID and CLIENT_SECRET must be set")) {
             return res.status(500).json({ message: "Server configuration error. API keys are missing." });
        }
        return res.status(500).json({ message: "Internal server error while fetching coordinates." });
    }
}

async function getDirections(req, res) {
    const pickup = req.query.pickup
    const destination = req.query.destination;
    if (!pickup || !destination) {
        return res.status(400).json({ message: "Pickup and destination addresses are required." });
    }
    const result = await mapsServices.getDirections(pickup, destination)
    const distance = result.distances[0][1];
    const duration = result.durations[0][1];
    console.log(`Distance: ${distance}, Duration: ${duration}`);
    if (!result) {
        return res.status(404).json({ message: "Directions not found." });
    }
    return res.status(200).json({
        distance: distance,
        duration: duration,
    });
}

async function getAutoSuggest(req, res) {
    const address = req.query.address;

    if (!address) {
        return res.status(400).json({ message: "Address is required." });
    }

    try {
        const suggestions = await mapsServices.getAutoSuggest(address);
        console.log(suggestions);
        console.log(typeof(suggestions));
        if (suggestions) {
            return res.status(200).json(suggestions.suggestions);
        } else {
            // This case handles when the service returns no suggestions
            return res.status(404).json({ message: "No suggestions found for the given address." });
        }
    } catch (error) {
        // Log the error for server-side debugging
        console.error('Error in maps.controller.js - getAutoSuggest:', error.message);

        // Provide a more user-friendly error message to the client
        return res.status(500).json({ message: "Internal server error while fetching suggestions." });
    }   
}

// Export the function as a named export
export {getCoordinates , getDirections, getAutoSuggest}; ;