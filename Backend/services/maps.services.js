import axios from 'axios';
import qs from 'qs';

let cachedAccessToken = null;// Using a simple in-memory cache for the access token and its expiry
let tokenExpiryTime = 0; // Unix timestamp in milliseconds when the token expires

async function getMapplsAccessToken() {
    const now = Date.now();

    if (cachedAccessToken && tokenExpiryTime > now + (5 * 60 * 1000)) {    // Check if we have a token and it's not expired (give a buffer of 5 minutes)
        console.log('Using cached MapmyIndia access token.');
        return cachedAccessToken;
    }

    //console.log('Fetching new MapmyIndia access token...');    // If no valid token or expired, fetch a new one
    const CLIENT_ID = process.env.CLIENT_ID; 
    const CLIENT_SECRET = process.env.CLIENT_SECRET; 
    const tokenUrl = "https://outpost.mappls.com/api/security/oauth/token";
    const headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
    };
    const data = qs.stringify({
        grant_type: 'client_credentials',
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET
    });

    try {
        const response = await axios.post(tokenUrl, data, { headers });
        cachedAccessToken = response.data.access_token;
        tokenExpiryTime = now + (response.data.expires_in * 1000); // expires_in is in seconds
        console.log('MapmyIndia access token obtained and cached.');
        return cachedAccessToken;
    } catch (error) {
        console.error('Full Axios Error Object:', error); // Log the entire error object
        if (error.response) {
            console.error('Error Response Status:', error.response.status);
            console.error('Error Response Data:', error.response.data); // This is crucial for API-specific errors
            console.error('Error Response Headers:', error.response.headers);
        } else if (error.request) {
            console.error('Error Request (no response received):', error.request);
        } else {
            console.error('Error Message:', error.message);
        }
        throw new Error('Failed to obtain MapmyIndia access token.');
    }
}

async function getCoordinates(address) {
    if (!address) {
        throw new Error("Address is required for geocoding.");
    }

    try {
        const token = await getMapplsAccessToken(); // Get a valid token (cached or fresh)
        //console.log(`In the getCoordinates service, address: ${address} and got token: ${token}`);
        const url = "https://atlas.mappls.com/api/places/textsearch/json"; 
        const headers = {
            'Authorization': `Bearer ${token}`
        };
        const params = {
            query: address 
        };

        const response = await axios.get(url, { headers, params, timeout:10000 }); // Use geocodeUrl here
        //console.log('Response from MapmyIndia:', response.data);
        if (response.data) {
            const eloc = response.data.suggestedLocations[0].eLoc;
            return {eloc}
        }
            
    } catch (error) {
        console.error('Error in getCoordinates service:', error.response ? error.response.data : error.message);
        throw error;
    }
}

async function getDirections(pickup, destination) {
    //console.log(`Fetching directions from ${pickup} to ${destination}...`);
    if (!pickup || !destination) {
        throw new Error("Pickup and destination addresses are required for directions.");
    }
    try{
        const elocPickup = await getCoordinates(pickup);
        const elocDestination = await getCoordinates(destination);

        const baseurl = "https://apis.mappls.com/advancedmaps/v1"; // Use the correct URL for MapmyIndia directions API
        const restKey = process.env.REST_KEY; // Ensure you have a valid REST key set in your environment variables
        const resource = 'distance_matrix'
        const profile = 'driving';
        const geoposition = `${elocPickup.eloc};${elocDestination.eloc}`; // Combine pickup and destination eLocs
        const apiurl = `${baseurl}/${restKey}/${resource}/${profile}/${geoposition}`;
        const response = await axios.get(apiurl); // Use geocodeUrl here
        //console.log('Response from MapmyIndia directions API:', response.data);
        if (response.data) {
            return response.data.results;
        } else {
            throw new Error("No directions found for the given pickup and destination.");
        }

    }catch (error) {
        console.error('Error in getDirections service:', error.response ? error.response.data : error.message);
        throw error;
    }


}

async function getAutoSuggest(address){
    if (!address) {
        throw new Error("Address is required for geocoding.");
    }

    try {
        const token = await getMapplsAccessToken(); // Get a valid token (cached or fresh)
        console.log(`In the getCoordinates service, address: ${address} and got token: ${token}`);
        const url = "https://atlas.mappls.com/api/places/search/json"; 
        const headers = {
            'Authorization': `Bearer ${token}`
        };
        const params = {
            query: address 
        };

        const response = await axios.get(url, { headers, params, timeout:10000 }); // Use geocodeUrl here
        console.log('Response from MapmyIndia:', response.data);

        if (response.data) {
            const suggestions = response.data.suggestedLocations.map(location => ({
            name: location.placeName,
            address: location.placeAddress,
            eLoc: location.eLoc
        }));
        console.log(typeof(suggestions));    
        return {suggestions}
        }
            
    } catch (error) {
        console.error('Error in getCoordinates service:', error.response ? error.response.data : error.message);
        throw error;
    }
}

export default { getCoordinates, getDirections, getAutoSuggest  };