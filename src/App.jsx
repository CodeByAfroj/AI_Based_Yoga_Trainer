import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Homepage from './pages/Homepage/Homepage'
import Footer from './components/Footer/Footer'
import Header from './components/Header/Header'
import Dashboard from './pages/Dashbord/Dashboard'
import PageNotFound from "./pages/PageNotFound/PageNotFound"
import InstructionsPage from './pages/InstructionsPage/InstructionsPage'
import PosesPage from './pages/PosesPage/PosesPage'
import PoseDetailsPage from "./pages/PoseDetailsPage/PoseDetailsPage";
import PoseCamPage from "./pages/PoseCamPage/PoseCamPage";
import SessionCamPage from "./pages/SessionCamPage/SessionCamPage";
function App() {
  

  return (
    <>
    <BrowserRouter>
    <Header/>
        <Routes>
             <Route path='/' element={<Homepage/>}/>
             <Route path='/poses' element={<PosesPage/>}/>
             <Route path='/poses/:poseId' element={<PoseDetailsPage/>}/>
             <Route path="/practice/:poseId" element={<PoseCamPage />} />
             <Route path="/dashboard" element={<Dashboard />} />
             <Route path='/session/:poseId' element={<SessionCamPage/>}/>
             <Route path='/instructions' element={<InstructionsPage/>}/>
             <Route path='/*' element={<PageNotFound/>}/>
        </Routes>
       <Footer/> 
    </BrowserRouter>
    </>
  )
}

export default App
