import React from 'react'
import car from '../assets/car.jpg'

function VehiclePanel(props) {
  return (
    <div>
      <h5 onClick={(e)=> props.setVehiclePanel(false)} className='absolute top-5 right-5 text-3xl'><i className="ri-arrow-down-wide-line"></i></h5>
          <h2 className="text-3xl font-bold">Choose your Ride</h2>

        <div className="flex flex-col gap-5 justify-between items-center mt-5" >

        <div onClick={()=> props.setConfirmRidePanel(true)} className=" border-2 border-gray-200 active:border-black rounded-xl flex justify-between items-center w-full p-2">
          <img className='h-24' src={car} alt="car" />
          <div className=' w-1/2 '>
            <h3 className='text-2xl font-semibold'>UberGo <span><i className="ri-user-3-fill"></i></span>4</h3>
          </div>
          <h5 className='text-2xl font-bold'>₹ 100</h5>
        </div>

        <div onClick={()=> props.setConfirmRidePanel(true)} className=" border-2 border-gray-200 active:border-black rounded-xl  flex justify-between items-center w-full p-2">
          <img className='h-24' src={car} alt="car" />
          <div className=' w-1/2 '>
            <h3 className='text-2xl font-semibold'>UberGo <span><i className="ri-user-3-fill"></i></span>2</h3>
          </div>
          <h5 className='text-2xl font-bold'>₹ 100</h5>
        </div>

        <div onClick={()=> props.setConfirmRidePanel(true)} className="border-2 border-gray-200 active:border-black rounded-xl  flex justify-between items-center w-full p-2">
          <img className='h-24' src={car} alt="car" />
          <div className=' w-1/2 '>
            <h3 className='text-2xl font-semibold'>UberGo <span><i className="ri-user-3-fill"></i></span>3</h3>
          </div>
          <h5 className='text-2xl font-bold'>₹ 100</h5>
        </div>
        </div>
    </div>
  )
}

export default VehiclePanel
