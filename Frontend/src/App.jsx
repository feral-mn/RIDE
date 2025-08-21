import React from 'react'
import {Route, Routes} from 'react-router-dom'
import Hero from './pages/Hero'
import Userlogin from './pages/UserLogin'
import Usersignup from './pages/UserSignup'
import CaptainLogin from './pages/CaptainLogin'
import CaptainSignup from './pages/CaptainSignup'
import CaptainHome from './pages/CaptainHome'
import Home from './pages/Home'
import Logout from './pages/Logout'
import CaptainLogout from './pages/CaptainLogout'
import UserProtectWrapper from './pages/UserProtectWrpper'
import CaptainProtectWrapper from './pages/CaptainProtectWrapper'
import Riding from './pages/Riding'
import CaptainRiding from './pages/CaptainRiding'
import 'remixicon/fonts/remixicon.css'


const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Hero/>}/>
        <Route path="/login" element={<Userlogin/>}/>
        <Route path="/signup" element={<Usersignup/>}/>
        <Route path='/riding' element={<Riding />} />
        <Route path='/captain-riding' element={<CaptainRiding />} />
        <Route path="/captain-login" element={<CaptainLogin/>}/>
        <Route path="/captain-signup" element={<CaptainSignup/>}/> 

        <Route path="/home" element={<UserProtectWrapper> <Home/> </UserProtectWrapper>}/>

        <Route path="/captain-home" element={<CaptainProtectWrapper> <CaptainHome/> </CaptainProtectWrapper>}/>

        <Route path="/logout" element={<UserProtectWrapper> <Logout/> </UserProtectWrapper>}/>

        <Route path="/captain-logout" element={<CaptainProtectWrapper> <CaptainLogout/> </CaptainProtectWrapper>}/>
      </Routes>
    </div>
  )
}

export default App
