import React, { useState } from 'react'
import ridelogo from '../assets/ride.png'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import { UserDataContext } from '../context/UserContext';


function UserLogin() {

  const[email, setEmail] = useState('');
  const[password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(''); 

  const navigate = useNavigate();
  const [user, setUser] = React.useContext(UserDataContext);

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading
    setErrorMessage(''); // Clear previous error messages

    const userData = {
      email: email,
      password: password,
    };

try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/user/login`, userData);
      if (response.status === 201 || response.data.success) {
        console.log('User login sucessfull', response.data);
        const data = response.data;
        setUser(data.user); // Update user context
        console.log("token", data.token)
        localStorage.setItem('token', data.token); // Store token in localStorage 
        navigate('/home'); // Redirect to home on success

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
            {loading ? 'logging In...' : 'Login'} {/* Change button text during loading */}
          </button>
          <p>New here? <Link to="/signup" className="text-blue-600 ">Create a new Account</Link></p>
      </form>
      </div>
    <div>
      <Link to="/captain-login">
      <button
            className="bg-emerald-400 text-white py-2 px-4 mb-5 font-bold text-lg border-gray-300 rounded w-full"
          >
            Captain HERE!
          </button>
      </Link>
    </div>
    </div>
    
  )
}

export default UserLogin
