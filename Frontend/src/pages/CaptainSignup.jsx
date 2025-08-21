import ridelogo from '../assets/ride.png'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { CaptainDataContext } from '../context/CaptainContext'


 function CaptainSignup() {
  
  const[email, setEmail] = useState('');
  const[password, setPassword] = useState('');
  const[firstname, setFirstName] = useState('');
  const[lastname, setLastName] = useState('');
  const[color, setColor] = useState('');
  const[numberPlate, setNumberPlate] = useState('');
  const[type, setType] = useState('');
  const[model, setModel] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(''); 

  const navigate = useNavigate();
  const [captain, setCaptain] = React.useContext(CaptainDataContext);

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading
    setErrorMessage(''); // Clear previous error messages
    const captainData = {
      email: email,
      password: password,
      firstname: firstname,
      lastname: lastname,
      color: color,
      numberPlate: numberPlate,
      type: type,
      model: model
    }
    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captain/register`, captainData);
      if (response.status === 201 || response.data.success) {
        const data = response.data;
        localStorage.setItem('token', data.token); // Store token in localStorage 
        setCaptain(data.captain); // Update user context
        console.log('Captain registered successfully:', response.data);
        navigate('/captain-home'); // Redirect to home on success

        // Clear form fields
        setEmail('');
        setPassword('');
        setFirstName('');
        setLastName('');
        setColor('');
        setNumberPlate('');
        setType('');
        setModel('');

      } else {
        // This 'else' block will catch responses that are not 201/success:true
        // but still considered 'successful' by Axios (e.g., a 200 OK with an error message)
        setErrorMessage(response.data.errors || 'An unexpected error occurred during signup.');
      }
    } catch (error) {
      //console.error('Error during signup:', error);
      if (error.response) {
        // Server responded with a status code outside of 2xx range
        // This is where your "email already exists" message would typically come from (e.g., 400 Bad Request)
      console.error('Server response error:', error.response.data);
        setErrorMessage(error.response.data.errors || error.response.data.message);
      } else if (error.request) {
        // The request was made but no response was received
        setErrorMessage('No response from server. Please check your internet connection.');
      } else {
        // Something else happened in setting up the request
        setErrorMessage('An unexpected client error occurred. Please try again.');
      }
    } finally {
      setLoading(false); // Stop loading regardless of success or failure
    }
  }

  return (
    <div className="p-5 h-screen flex flex-col justify-between">
      <div>
        <img className="h-10 w-20 mb-10" src={ridelogo} alt="" />
      <form onSubmit={(e)=>{
        submitHandler(e);
      }}>
          
          <h3 className="text-3xl font-bold mb-3">What's your name</h3>
          <div className="flex gap-4 mb-7">
          <input type="text" required value={firstname} onChange={(e)=>setFirstName(e.target.value)} placeholder="First Name" className="bg-gray-200 px-4 py-2 border border-gray-300 rounded w-1/2 text-lg placeholder: text-base" />
          <input type="text" required value={lastname} onChange={(e)=>setLastName(e.target.value)} placeholder="Last Name" className="bg-gray-200 px-4 py-2 border border-gray-300 rounded w-1/2 text-lg placeholder: text-base" />
          </div>
          <h3 className="text-3xl font-bold mb-3">What's your email</h3>
          <input
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            required
            type="email"
            placeholder="email@example.com"
            className="bg-gray-200 mb-7 px-4 py-2 border border-gray-300 rounded w-full text-lg placeholder: text-base"
          />
          <h3 className="text-3xl font-bold mb-3">Enter your password</h3>
          <input
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            required
            type="password"
            placeholder="Password"
            className="bg-gray-200 mb-7 px-4 py-2 border border-gray-300 rounded w-full text-lg placeholder: text-base"
          />
          <h3 className="text-3xl font-bold mb-3">Vehicle Details</h3>
          <div className="flex gap-4 mb-7 ">
            <input
              type="text"
              required
              value={model}
              onChange={(e) => setModel(e.target.value)}
              placeholder="Model"
              className="bg-gray-200 px-4 py-2 border  border-gray-300 rounded w-1/2 text-lg placeholder: text-base"
            />
            <input
              type="text"
              required
              value={color}
              onChange={(e) => setColor(e.target.value)}
              placeholder="Color"
              className="bg-gray-200 px-4 py-2 border border-gray-300 rounded w-1/2 text-lg placeholder: text-base"
            />
          </div>
          <div className="mb-7 flex gap-4">
           <input
              type="number"
              required
              value={numberPlate}
              onChange={(e) => setNumberPlate(e.target.value)}
              placeholder="Number Plate"
              className="bg-gray-200 px-4 py-2 border border-gray-300 rounded w-1/2 text-lg placeholder: text-base"
            />
            <select
              required
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="bg-gray-200 px-4 py-2 border border-gray-300 rounded w-1/2 text-lg"
            >
              <option value="" disabled>
                Select vehicle type
              </option>
              <option value="car">Car</option>
              <option value="bike">Bike</option>
              <option value="auto">Auto</option>
            </select>
          </div>

          {/* Display error message if it exists */}
          {errorMessage && (
            <p className="text-red-500 text-center mb-4 text-sm font-medium">
              {errorMessage}
            </p>
          )}
          
          <button
            type="submit"
            className="bg-black text-white py-2 px-4 mb-5 font-bold text-lg border-gray-300 rounded w-full"
            disabled={loading} // Disable button while loading
          >
            {loading ? 'Signing Up...' : 'Signup'} {/* Change button text during loading */}
          </button>
          <p>Already in our fleet? <Link to="/captain-login" className="text-blue-600 ">Login</Link></p>
      </form>
      </div>
    <div>
     <p className="leading-tight">By proceeding you consent to get call, Whatsapp messages and what not iki jankari baad me di jaegi</p>
    </div>
    </div>
    
  )
}

export default CaptainSignup

