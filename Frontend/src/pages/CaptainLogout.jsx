import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import React from 'react'; // Import React to use useEffect

function CaptainLogout() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const token = localStorage.getItem('token');

    try {
      // Make the API call to log out the user
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/captain/logout`, {
        headers: {
          Authorization: `Bearer ${token}` // Attach the authorization token
        }
      });

      // Check if the logout was successful based on status or response data
      if (response.status === 200 || response.data.success) {
        console.log('User logged out successfully', response.data);
        // Optionally, display a success message to the user
      }
    } catch (error) {
      // Catch any errors that occur during the API call
      console.error('Logout failed:', error);

      // Provide more specific error handling based on the type of error
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx (e.g., 401, 403, 500)
        console.error('Error data:', error.response.data);
        console.error('Error status:', error.response.status);
        console.error('Error headers:', error.response.headers);
        // You can display an error message to the user, e.g., "Server error, please try again."
      } else if (error.request) {
        // The request was made but no response was received (e.g., network error)
        console.error('Error request:', error.request);
        // You can inform the user about network issues, e.g., "Network error, please check your connection."
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error message:', error.message);
        // You can inform the user about an unexpected error, e.g., "An unexpected error occurred."
      }
    } finally {
      // This block will always execute, regardless of whether the try block succeeded or an error occurred.
      // It ensures that the token is removed and the user is redirected.
      localStorage.removeItem('token'); // Remove the token from client-side storage
      navigate('/'); // Redirect to the home or login page
    }
  };

  // Use useEffect to trigger the logout process when the component mounts.
  // This assumes the Logout component is rendered when a logout action is intended.
  React.useEffect(() => {
    handleLogout();
  }, []); // Empty dependency array ensures this runs only once on mount

  // The component renders a simple message. In a real app, you might show a loading spinner
  // or a "Logging out..." message while the process completes.
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-6 bg-white rounded-lg shadow-md">
        <p className="text-lg font-semibold text-gray-700">Logging out...</p>
      </div>
    </div>
  );
}

export default CaptainLogout;