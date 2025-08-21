import React, { useState } from 'react'
import ridelogo from '../assets/ride.png'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { CaptainDataContext } from '../context/CaptainContext'


function CaptainLogin() {

  const[email, setEmail] = useState('');
  const[password, setPassword] = useState('');
  const[captainData, setCaptainData] = useState({});
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
    }
    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captain/login`, captainData);
      if (response.status === 201 || response.data.success) {
        const data = response.data;
        localStorage.setItem('token', data.token); // Store token in localStorage 
        setCaptain(data.captain); // Update user context
        console.log('Captain login successfull:', response.data);
        navigate('/captain-home'); // Redirect to home on success

        // Clear form fields
        setEmail('');
        setPassword('');
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

          {/* Display error message if it exists */}
          {errorMessage && (
            <p className="text-red-500 text-center mb-4 text-sm font-medium">
              {errorMessage}
            </p>
          )}
          
          <button
            type="submit"
            className="bg-black text-white py-2 px-4 mb-5 font-bold text-lg border-gray-300 rounded w-full"
          >
            Login
          </button>
          <p>Want to join our fleet? <Link to="/captain-signup" className="text-blue-600 ">Register as a Captain</Link></p>
      </form>
      </div>
    <div>
      <Link to="/login">
      <button
            className="bg-amber-600 text-white py-2 px-4 mb-5 font-bold text-lg border-gray-300 rounded w-full"
          >
            User HERE!
          </button>
      </Link>
    </div>
    </div>
    
  )
}

export default CaptainLogin
