import React from 'react'
import Logo from '../pages/Logo'
import map from '../assets/map.jpg'
import {useGSAP} from '@gsap/react'
import  gsap  from 'gsap';
import 'remixicon/fonts/remixicon.css'
import LocationSearchPanel from '../components/LocationSearchPanel';
import VehiclePanel from '../components/VehiclePanel';
import ConfirmRide from '../components/ConfirmRide';
import LookingForDriver from '../components/LookingForDriver';
import WaitingForDriver from '../components/WaitingForDriver';
import axios from 'axios';



function Home() {

  const [pickup, setPickup] = React.useState('');
  const [destination, setDestination] = React.useState('');
  const [panelOpen, setPanelOpen] = React.useState(false);
  const panelRef = React.useRef(null);
  const vehiclePanelRef = React.useRef(null);
  const confirmRidePanelRef = React.useRef(null);
  const panelCloseRef = React.useRef(null);
  const vehicleFoundRef = React.useRef(null);
  const waitingForDriverRef = React.useRef(null);
  const [vehiclePanel, setVehiclePanel] = React.useState(false);
  const [confirmRidePanel, setConfirmRidePanel] = React.useState(false);
  const [vehicleFound, setVehicleFound] = React.useState(false);
  const [waitingForDriver, setWaitingForDriver] = React.useState(false);
  const [pickupAutoSuggest, setPickupAutoSuggest] = React.useState([]);
  const [destinationAutoSuggest, setDestinationAutoSuggest] = React.useState([]);
  const [activeField, setActiveField] = React.useState('');

  async function handlePickupChange(e) {
    setPickup(e.target.value)
    console.log(e.target.value)

    const Data = {
      address: e.target.value,
    };

      try{
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-auto-suggest`, {
          params:{
            address: e.target.value,
          }       
        })
        setPickupAutoSuggest(response.data)
      }catch(err){
        console.error("Error fetching destination suggestions:", err);
      }
  }

  async function handleDestinationChange(e) {
    setDestination(e.target.value)
    console.log(e.target.value)
      try{
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-auto-suggest`, {
          params:{
            address: e.target.value,
          }       
        })
        setDestinationAutoSuggest(response.data)
      }catch(err){
        console.error("Error fetching destination suggestions:", err);
      }
  }

  function submitHandler(e) {
    e.preventDefault();
    console.log("Form submitted");
  }

  useGSAP(() => {
    if(panelOpen){
      gsap.to(panelRef.current,{
      height: '70%',
      ease: 'power2.inOut',
      opacity: 1,
      })
      gsap.to(panelCloseRef.current,{
        opacity: 1,
      })
    }else{
      gsap.to(panelRef.current,{
      height: '0%',
      ease: 'power2.inOut',
      opacity: 0,
      })
      gsap.to(panelCloseRef.current,{
        opacity: 0,
      })
    }
  },[panelOpen])

  useGSAP(() => {
    if(vehiclePanel){
      gsap.to(vehiclePanelRef.current,{
      transform: 'translateY(0)',
    })
    }else{
      gsap.to(vehiclePanelRef.current,{
      transform: 'translateY(100%)',
    })
    }
  },[vehiclePanel])

  useGSAP(() => {
    if(confirmRidePanel){
      gsap.to(confirmRidePanelRef.current,{
      transform: 'translateY(0)',
    })
    }else{
      gsap.to(confirmRidePanelRef.current,{
      transform: 'translateY(100%)',
    })
    }
  },[confirmRidePanel])

  useGSAP(() => {
    if(vehicleFound){
      gsap.to(vehicleFoundRef.current,{
      transform: 'translateY(0)',
    })
    }else{
      gsap.to(vehicleFoundRef.current,{
      transform: 'translateY(100%)',
    })
    }
  },[vehicleFound])

  useGSAP(() => {
    if(waitingForDriver){
      gsap.to(waitingForDriverRef.current,{
      transform: 'translateY(0)',
    })
    }else{
      gsap.to(waitingForDriverRef.current,{
      transform: 'translateY(100%)',
    })
    }
  },[waitingForDriver])

  return (
    <div className="h-screen relative overflow-hidden">
      <Logo/>  

      <div className="h-screen w-screen">
        <img className="h-full w-full" src={map} alt="" />
      </div>

      <div className="flex flex-col justify-end absolute h-screen top-0 w-full " >
        <div className=" flex flex-col gap-5 relative bg-white p-5">
          <h5 ref={panelCloseRef} onClick={(e)=> setPanelOpen(false)} className='absolute top-5 right-5 text-3xl'><i className="ri-arrow-down-wide-line"></i></h5>
          <h3 className="text-3xl font-bold">Find a Ride</h3>
          
        <form onSubmit={(e)=>{
          submitHandler(e);
        }} className='flex flex-col gap-5 '>
          
          <input onClick={()=> {
            setPanelOpen(true)
            setActiveField('pickup')
            }} value={pickup} onChange={handlePickupChange} className="bg-gray-200 px-4 py-2 border border-gray-300 rounded w-full text-lg placeholder: text-base" type="text" placeholder='Add pick up location' />
          <input onClick={()=> {
            setPanelOpen(true)
            setActiveField('destination')
            }} value={destination} onChange={handleDestinationChange} className="bg-gray-200 px-4 py-2 border border-gray-300 rounded w-full text-lg placeholder: text-base" type="text" placeholder='Enter yout destination'/>
        
        </form>

        </div>

        <div ref={panelRef} className="h-[70%] p-5 bg-white opacity-0">
        <LocationSearchPanel 
        setPickup={setPickup} 
        suggestions={activeField === 'pickup' ? pickupAutoSuggest : destinationAutoSuggest}
        setDestination={setDestination} 
        panelOpen={panelOpen} 
        setPanelOpen={setPanelOpen} 
        vehiclePanel={vehiclePanel} 
        setVehiclePanel={setVehiclePanel}
        activeField={activeField}/>
        </div>
      </div>n

      <div ref={vehiclePanelRef} className=" flex flex-col gap-3 fixed translate-y-full z-10 bg-white bottom-0 w-full p-5 px-3 py-8 rounded-2xl">
        <VehiclePanel setConfirmRidePanel={setConfirmRidePanel} setVehiclePanel={setVehiclePanel} />
      </div>

      <div ref={confirmRidePanelRef} className=" flex flex-col gap-3 fixed translate-y-full z-10 bg-white bottom-0 w-full p-5 px-3 py-8 rounded-2xl ">
        <ConfirmRide setConfirmRidePanel={setConfirmRidePanel} setVehicleFound={setVehicleFound} />
      </div>

      <div ref={vehicleFoundRef} className=" flex flex-col gap-3 fixed translate-y-full z-10 bg-white bottom-0 w-full p-5 px-3 py-8 rounded-2xl ">
        <LookingForDriver setVehicleFound={setVehicleFound}  />
      </div>

      <div ref={waitingForDriverRef} className=" flex flex-col gap-3 fixed   bg-white bottom-0 w-full p-5 px-3 py-8 rounded-2xl ">
        <WaitingForDriver setWaitingForDriver={setWaitingForDriver} />
      </div>
    </div>
  )
}

export default Home
