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

    if (loading) return <div style={{ textAlign: 'center', padding: '50px', color: '#999' }}>Chargement...</div>;
    if (!user) return <div>Veuillez vous connecter</div>;

    return (
        <div>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '30px',
                flexWrap: 'wrap'
            }}>
                <div>
                    <h2 style={{
                        fontSize: '1.8rem',
                        fontWeight: '300',
                        margin: 0,
                        color: '#1a1a2e'
                    }}>
                        👋 Bonjour, {user.prenom} {user.nom}
                    </h2>
                    <p style={{ color: '#999', margin: '4px 0 0', fontSize: '0.9rem' }}>
                        Rôle : <span style={{
                            background: '#f5f0eb',
                            color: '#555',
                            padding: '2px 14px',
                            borderRadius: '50px',
                            fontSize: '0.8rem',
                            fontWeight: '500'
                        }}>{user.role}</span>
                    </p>
                </div>
                <button
                    onClick={handleLogout}
                    style={{
                        background: 'transparent',
                        border: '1px solid #e0d8d0',
                        color: '#888',
                        padding: '8px 24px',
                        borderRadius: '50px',
                        fontSize: '0.85rem',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                        e.target.style.background = '#1a1a2e';
                        e.target.style.color = 'white';
                        e.target.style.borderColor = '#1a1a2e';
                    }}
                    onMouseLeave={(e) => {
                        e.target.style.background = 'transparent';
                        e.target.style.color = '#888';
                        e.target.style.borderColor = '#e0d8d0';
                    }}
                >
                    Déconnexion
                </button>
            </div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: '20px'
            }}>
                <div style={{
                    background: 'white',
                    borderRadius: '16px',
                    padding: '24px',
                    boxShadow: '0 2px 20px rgba(0,0,0,0.04)',
                    border: '1px solid #f0ebe6'
                }}>
                    <p style={{ color: '#999', margin: 0, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Biens</p>
                    <p style={{ fontSize: '2.2rem', fontWeight: '300', color: '#1a1a2e', margin: '4px 0 0' }}>
                        {stats.biens}
                    </p>
                </div>
                <div style={{
                    background: 'white',
                    borderRadius: '16px',
                    padding: '24px',
                    boxShadow: '0 2px 20px rgba(0,0,0,0.04)',
                    border: '1px solid #f0ebe6'
                }}>
                    <p style={{ color: '#999', margin: 0, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Locataires</p>
                    <p style={{ fontSize: '2.2rem', fontWeight: '300', color: '#1a1a2e', margin: '4px 0 0' }}>
                        {stats.locataires}
                    </p>
                </div>
                <div style={{
                    background: 'white',
                    borderRadius: '16px',
                    padding: '24px',
                    boxShadow: '0 2px 20px rgba(0,0,0,0.04)',
                    border: '1px solid #f0ebe6'
                }}>
                    <p style={{ color: '#999', margin: 0, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Occupation</p>
                    <p style={{ fontSize: '2.2rem', fontWeight: '300', color: '#1a1a2e', margin: '4px 0 0' }}>
                        {stats.biens > 0 ? Math.round((stats.locataires / stats.biens) * 100) : 0}%
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;