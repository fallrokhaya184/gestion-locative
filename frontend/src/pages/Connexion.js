import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { Link } from 'react-router-dom';
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
            setErreur('Erreur de connexion');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '70vh'
        }}>
            <div style={{
                background: 'white',
                borderRadius: '20px',
                padding: '48px 40px',
                maxWidth: '420px',
                width: '100%',
                boxShadow: '0 4px 40px rgba(0,0,0,0.04)',
                border: '1px solid #f0ebe6'
            }}>
                <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                    <div style={{
                        width: '56px',
                        height: '56px',
                        background: '#1a1a2e',
                        borderRadius: '14px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '24px',
                        margin: '0 auto 15px',
                        color: 'white'
                    }}>
                        🔐
                    </div>
                    <h2 style={{
                        fontSize: '1.5rem',
                        fontWeight: '300',
                        color: '#1a1a2e',
                        marginBottom: '4px'
                    }}>
                        Connexion
                    </h2>
                    <p style={{ color: '#999', fontSize: '0.9rem' }}>
                        Accédez à votre espace
                    </p>
                </div>

                {erreur && (
                    <div style={{
                        background: '#f8f0f0',
                        color: '#a94442',
                        padding: '10px 16px',
                        borderRadius: '10px',
                        marginBottom: '20px',
                        fontSize: '0.85rem'
                    }}>
                        ⚠️ {erreur}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '18px' }}>
                        <label style={{
                            display: 'block',
                            fontSize: '0.8rem',
                            fontWeight: '500',
                            color: '#555',
                            marginBottom: '5px',
                            letterSpacing: '0.5px',
                            textTransform: 'uppercase'
                        }}>
                            Email
                        </label>
                        <input
                            type="email"
                            style={{
                                width: '100%',
                                padding: '12px 16px',
                                borderRadius: '10px',
                                border: '1px solid #e0d8d0',
                                fontSize: '0.95rem',
                                outline: 'none',
                                transition: 'border-color 0.3s ease',
                                background: '#faf8f6'
                            }}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="exemple@email.com"
                            required
                        />
                    </div>

                    <div style={{ marginBottom: '24px' }}>
                        <label style={{
                            display: 'block',
                            fontSize: '0.8rem',
                            fontWeight: '500',
                            color: '#555',
                            marginBottom: '5px',
                            letterSpacing: '0.5px',
                            textTransform: 'uppercase'
                        }}>
                            Mot de passe
                        </label>
                        <input
                            type="password"
                            style={{
                                width: '100%',
                                padding: '12px 16px',
                                borderRadius: '10px',
                                border: '1px solid #e0d8d0',
                                fontSize: '0.95rem',
                                outline: 'none',
                                transition: 'border-color 0.3s ease',
                                background: '#faf8f6'
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
                            background: '#1a1a2e',
                            color: 'white',
                            border: 'none',
                            borderRadius: '10px',
                            fontSize: '0.9rem',
                            fontWeight: '500',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            letterSpacing: '0.5px'
                        }}
                    >
                        {loading ? 'Connexion...' : 'Se connecter'}
                    </button>
                </form>
                <div style={{
    marginTop: '16px',
    textAlign: 'center',
    fontSize: '0.85rem',
    color: '#999'
}}>
    Pas encore de compte ?{' '}
    <Link to="/inscription" style={{
        color: '#1a1a2e',
        textDecoration: 'none',
        fontWeight: '500'
    }}>
        Créer un compte
    </Link>
</div>

                <div style={{
                    marginTop: '20px',
                    padding: '14px',
                    background: '#faf8f6',
                    borderRadius: '10px',
                    fontSize: '0.8rem',
                    color: '#888'
                }}>
                    <strong style={{ color: '#555' }}>🔑 Comptes de test :</strong>
                    <ul style={{ margin: '6px 0 0', paddingLeft: '18px' }}>
                        <li>Admin : admin@gestloc.com / admin123</li>
                        <li>Propriétaire : mamadou.diop@email.com / propri123</li>
                        <li>Locataire : aissata.ndiaye@email.com / loca123</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Connexion;