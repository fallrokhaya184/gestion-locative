import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

function Dashboard() {
    const [user, setUser] = useState(null);
    const [stats, setStats] = useState({ biens: 0, locataires: 0 });
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const userData = localStorage.getItem('user');
        if (!userData) {
            navigate('/connexion');
            return;
        }
        setUser(JSON.parse(userData));
        
        // Charger les statistiques
        const fetchStats = async () => {
            try {
                const [biensRes, usersRes] = await Promise.all([
                    api.get('/biens'),
                    api.get('/utilisateurs')
                ]);
                setStats({
                    biens: biensRes.data.length,
                    locataires: usersRes.data.filter(u => u.role === 'locataire').length
                });
            } catch (error) {
                console.error('Erreur stats:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/connexion');
    };

    if (loading) {
        return <div style={{ textAlign: 'center', padding: '50px' }}>Chargement...</div>;
    }

    if (!user) {
        return <div>Veuillez vous connecter</div>;
    }

    return (
        <div>
            {/* En-tête */}
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '30px',
                flexWrap: 'wrap'
            }}>
                <div>
                    <h2 style={{ fontSize: '2rem', fontWeight: '700', margin: 0 }}>
                        👋 Bonjour, {user.prenom} {user.nom}
                    </h2>
                    <p style={{ color: '#666', margin: '5px 0 0' }}>
                        Rôle : <span style={{
                            background: user.role === 'admin' ? '#667eea' : '#4facfe',
                            color: 'white',
                            padding: '2px 14px',
                            borderRadius: '50px',
                            fontSize: '0.85rem',
                            fontWeight: '600'
                        }}>{user.role}</span>
                    </p>
                </div>
                <button
                    onClick={handleLogout}
                    style={{
                        background: 'transparent',
                        border: '2px solid #dc3545',
                        color: '#dc3545',
                        padding: '8px 24px',
                        borderRadius: '50px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                        e.target.style.background = '#dc3545';
                        e.target.style.color = 'white';
                    }}
                    onMouseLeave={(e) => {
                        e.target.style.background = 'transparent';
                        e.target.style.color = '#dc3545';
                    }}
                >
                    🚪 Déconnexion
                </button>
            </div>

            {/* Statistiques */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '20px',
                marginBottom: '30px'
            }}>
                <div style={{
                    background: 'linear-gradient(135deg, #667eea, #764ba2)',
                    borderRadius: '16px',
                    padding: '25px',
                    color: 'white'
                }}>
                    <p style={{ margin: 0, opacity: 0.8 }}>🏠 Total des biens</p>
                    <h2 style={{ fontSize: '2.5rem', fontWeight: '700', margin: '5px 0 0' }}>
                        {stats.biens}
                    </h2>
                </div>
                <div style={{
                    background: 'linear-gradient(135deg, #4facfe, #00f2fe)',
                    borderRadius: '16px',
                    padding: '25px',
                    color: 'white'
                }}>
                    <p style={{ margin: 0, opacity: 0.8 }}>👥 Locataires</p>
                    <h2 style={{ fontSize: '2.5rem', fontWeight: '700', margin: '5px 0 0' }}>
                        {stats.locataires}
                    </h2>
                </div>
                <div style={{
                    background: 'linear-gradient(135deg, #43e97b, #38f9d7)',
                    borderRadius: '16px',
                    padding: '25px',
                    color: '#1a1a2e'
                }}>
                    <p style={{ margin: 0, opacity: 0.7 }}>📊 Taux d'occupation</p>
                    <h2 style={{ fontSize: '2.5rem', fontWeight: '700', margin: '5px 0 0' }}>
                        {stats.biens > 0 ? Math.round((stats.locataires / stats.biens) * 100) : 0}%
                    </h2>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;