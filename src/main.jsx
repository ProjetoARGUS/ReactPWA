import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SplashScreen from './pages/SplashScreen';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import './index.css';
import RecoveryPage from './pages/RecoveryPage';
import RecoveryKeyPage from './pages/RecoveryKeyPage';
import UpKeepPage from './pages/UpKeepPage';

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
            </Routes>
        </Router>
  </StrictMode>,
)
