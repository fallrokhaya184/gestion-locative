import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

function Connexion() {
    const [email, setEmail] = useState('');
    const [motDePasse, setMotDePasse] = useState('');
    const [erreur, setErreur] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErreur('');

        try {
            const response = await api.post('/utilisateurs/login', {
                email: email.trim(),
                motDePasse: motDePasse.trim()
            });

            if (response.data) {
                localStorage.setItem('user', JSON.stringify(response.data));
                navigate('/dashboard');
            } else {
                setErreur('Email ou mot de passe incorrect');
            }
        } catch (error) {
            setErreur('Erreur de connexion. Vérifie que le backend tourne.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="row justify-content-center" style={{ minHeight: '70vh', alignItems: 'center' }}>
            <div className="col-md-5">
                <div style={{
                    background: 'white',
                    borderRadius: '24px',
                    padding: '48px 40px',
                    boxShadow: '0 20px 60px rgba(0,0,0,0.08)',
                    border: '1px solid #f0f0f0'
                }}>
                    <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                        <div style={{
                            width: '64px',
                            height: '64px',
                            background: 'linear-gradient(135deg, #667eea, #764ba2)',
                            borderRadius: '18px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '28px',
                            margin: '0 auto 15px',
                            color: 'white'
                        }}>
                            🔐
                        </div>
                        <h2 style={{
                            fontSize: '1.8rem',
                            fontWeight: '700',
                            color: '#1a1a2e',
                            marginBottom: '5px'
                        }}>
                            Connexion
                        </h2>
                        <p style={{ color: '#666', fontSize: '0.95rem' }}>
                            Accédez à votre espace personnel
                        </p>
                    </div>

                    {erreur && (
                        <div style={{
                            background: '#fce8e6',
                            color: '#c62828',
                            padding: '12px 16px',
                            borderRadius: '12px',
                            marginBottom: '20px',
                            fontSize: '0.9rem'
                        }}>
                            ⚠️ {erreur}
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        <div style={{ marginBottom: '20px' }}>
                            <label style={{
                                display: 'block',
                                fontWeight: '600',
                                color: '#1a1a2e',
                                marginBottom: '6px',
                                fontSize: '0.9rem'
                            }}>
                                Email
                            </label>
                            <input
                                type="email"
                                style={{
                                    width: '100%',
                                    padding: '12px 16px',
                                    borderRadius: '12px',
                                    border: '2px solid #e0e0e0',
                                    fontSize: '1rem',
                                    transition: 'border-color 0.3s ease',
                                    outline: 'none',
                                    background: '#f8f9fa'
                                }}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="exemple@email.com"
                                required
                            />
                        </div>

                        <div style={{ marginBottom: '25px' }}>
                            <label style={{
                                display: 'block',
                                fontWeight: '600',
                                color: '#1a1a2e',
                                marginBottom: '6px',
                                fontSize: '0.9rem'
                            }}>
                                Mot de passe
                            </label>
                            <input
                                type="password"
                                style={{
                                    width: '100%',
                                    padding: '12px 16px',
                                    borderRadius: '12px',
                                    border: '2px solid #e0e0e0',
                                    fontSize: '1rem',
                                    transition: 'border-color 0.3s ease',
                                    outline: 'none',
                                    background: '#f8f9fa'
                                }}
                                value={motDePasse}
                                onChange={(e) => setMotDePasse(e.target.value)}
                                placeholder="••••••••"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            style={{
                                width: '100%',
                                padding: '14px',
                                background: 'linear-gradient(135deg, #667eea, #764ba2)',
                                color: 'white',
                                border: 'none',
                                borderRadius: '12px',
                                fontSize: '1rem',
                                fontWeight: '600',
                                cursor: 'pointer',
                                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                                boxShadow: '0 4px 20px rgba(102, 126, 234, 0.3)'
                            }}
                        >
                            {loading ? '⏳ Connexion...' : 'Se connecter'}
                        </button>
                    </form>

                    <div style={{
                        marginTop: '25px',
                        padding: '16px',
                        background: '#f8f9fa',
                        borderRadius: '12px',
                        fontSize: '0.85rem',
                        color: '#555'
                    }}>
                        <strong>🔑 Comptes de test :</strong>
                        <ul style={{ margin: '8px 0 0', paddingLeft: '20px' }}>
                            <li>Admin : <code>admin@gestloc.com</code> / <code>admin123</code></li>
                            <li>Propriétaire : <code>mamadou.diop@email.com</code> / <code>propri123</code></li>
                            <li>Locataire : <code>aissata.ndiaye@email.com</code> / <code>loca123</code></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Connexion;