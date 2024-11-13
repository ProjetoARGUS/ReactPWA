import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SplashScreen from './pages/SplashScreen';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
            <Routes>
                <Route path='/' element={<SplashScreen/>} />
                <Route path='/login' element={<LoginPage/>} />
                <Route path='/home' element={<HomePage/>} />
            </Routes>
        </Router>
  </StrictMode>,
)
