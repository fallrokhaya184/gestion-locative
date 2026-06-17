import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/Navbar';
import Accueil from './pages/Accueil';
import Biens from './pages/Biens';
import Connexion from './pages/Connexion';
import Dashboard from './pages/Dashboard';

function App() {
    return (
        <Router>
            <div style={{ 
                background: '#f8f9fa', 
                minHeight: '100vh',
                fontFamily: 'Segoe UI, system-ui, -apple-system, sans-serif'
            }}>
                <Navbar />
                <div className="container py-4">
                    <Routes>
                        <Route path="/" element={<Accueil />} />
                        <Route path="/biens" element={<Biens />} />
                        <Route path="/connexion" element={<Connexion />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;