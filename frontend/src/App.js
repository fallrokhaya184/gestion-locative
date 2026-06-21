import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/Navbar';
import Accueil from './pages/Accueil';
import Biens from './pages/Biens';
import Connexion from './pages/Connexion';
import Dashboard from './pages/Dashboard';
import Inscription from './pages/Inscription';
import AjouterBien from './pages/AjouterBien';

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
                        <Route path="/inscription" element={<Inscription />} />
                        <Route path="/ajouter-bie" element={<AjouterBien/>}/>
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;