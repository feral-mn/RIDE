import React from 'react'
import car from '../assets/car.jpg'

function LookingForDriver(props) {
  return (
    <div>
          <div>
            <h5 onClick={(e)=> props.setVehicleFound(false)} className='absolute top-5 right-5 text-3xl'><i className="ri-arrow-down-wide-line"></i></h5>
            <h2 className="text-3xl font-bold">Looking for Captain</h2>
      
              <div className="flex flex-col gap-5 justify-between items-center" >
              <img className='h-35' src={car} alt="car" /> 
              <div className='flex flex-col gap-5 w-full'>
                  <div className="flex itborder-gray-200ems-center gap-5 p-3 border-b-2 border-gray-200">
                      <i className="text-xl ri-map-pin-2-line"></i>
                      <div>
                          <h3 className="text-xl font-medium">562/11-A</h3>
                          <p className="text-lg -mt-1 text-gray-600">Something, Place</p>
                      </div>
                  </div>
                  <div className="flex items-center gap-5 p-3 border-b-2 border-gray-200">
                      <i className="text-xl ri-map-pin-2-fill"></i>
                      <div>
                          <h3 className="text-xl font-medium">562/11-A</h3>
                          <p className="text-lg -mt-1 text-gray-600">Something, Place</p>
                      </div>
                  </div>
                  <div className="flex items-center gap-5 p-3">
                      <i className="text-xl ri-cash-line"></i>
                      <div>
                          <h3 className="text-xl font-medium">201.04</h3>
                          <p className="text-lg -mt-1 text-gray-600">Something, Place</p>
                      </div>
                  </div>
              </div>
                            </div>
              
          </div>
    </div>
  )
}

export default LookingForDriver
