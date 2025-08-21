import React from 'react'
import ridelogo from '../assets/ride.png'
import home_img from '../assets/home_img.jpg'
import { Link } from 'react-router-dom'

function Hero() {
  return (
    <div>
      <div className='h-screen w-full pt-5  flex justify-between flex-col' style={{ backgroundImage: `url(${home_img})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <img className="h-10 w-20 ml-5" src={ridelogo} alt="" />
        <div className='bg-white pb-7 py-5 px-4'>
            <h2 className="text-3xl font-bold flex justify-center">Getting Started with Ride</h2>
            <Link to='/login' className="flex items-center justify-center text-1xl font-bold w-full bg-black text-white py-3 rounded mt-2">Continue</Link>
        </div>
      </div>
    </div>
  )
}

export default Hero
