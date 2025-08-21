import React from 'react'
import car from '../assets/car.jpg'

function WaitingForDriver(props) {
  return (
       <div>
         <h5 onClick={(e)=> props.setWaitingForDriver(false)} className='flex justify-center w-full absolute top-5 text-3xl text-gray-400'><i className="ri-arrow-down-wide-line"></i></h5>
        <div className="flex gap-5 items-center justify-center">
            <img className='h-35' src={car} alt="car" /> 
            <div>
                <h2 className="text-lg font-medium">Sarthak</h2>
                <h4 className="text-xl font-semibold">UP32 AB 1234</h4>
                <p className="text-sm text-gray-600">Dzire</p>
            </div>
        </div>
           <div className="flex flex-col gap-5 justify-between items-center" >

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
  )
}

export default WaitingForDriver
