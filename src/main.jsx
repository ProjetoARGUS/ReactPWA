import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import SplashScreen from './pages/SplashScreen';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import RecoveryPage from './pages/RecoveryPage';
import RecoveryKeyPage from './pages/RecoveryKeyPage';
import UpKeepPage from './pages/UpKeepPage';
import MediationPage from './pages/MediationPage';
import ReservationsPage from './pages/ReservationsPage';
import RegisterPage from './pages/RegisterPage';
import AssemblyPage from './pages/AssemblyPage';
import ProfilePage from './pages/ProfilePage';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
            <Routes>
                <Route path='/' element={<SplashScreen/>} />
                <Route path='/login' element={<LoginPage/>} />
                <Route path='/home' element={<HomePage/>} />
                <Route path='/recovery' element={<RecoveryPage/>} />
                <Route path='/recoveryKey' element={<RecoveryKeyPage/>} />
                <Route path='/upKeep' element={<UpKeepPage/>} />
                <Route path='/mediation' element={<MediationPage/>} />
                <Route path='/reservations' element={<ReservationsPage/>} />
                <Route path='/register' element={<RegisterPage/>} />
                <Route path='/assembly' element={<AssemblyPage/>} />
                <Route path='/profile' element={<ProfilePage/>} />
            </Routes>
        </Router>
  </StrictMode>,
)
