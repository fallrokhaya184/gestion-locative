import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';

function Biens() {
    const [biens, setBiens] = useState([]);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Récupérer l'utilisateur connecté
        const userData = localStorage.getItem('user');
        if (userData) {
            setUser(JSON.parse(userData));
        }

        chargerBiens();
    }, []);

    const chargerBiens = () => {
        setLoading(true);
        api.get('/biens')
            .then(response => setBiens(response.data))
            .catch(error => console.error('Erreur:', error))
            .finally(() => setLoading(false));
    };

    const supprimerBien = (id, reference) => {
        if (window.confirm(`Supprimer le bien ${reference} ?`)) {
            api.delete(`/biens/${id}`)
                .then(() => {
                    alert('✅ Bien supprimé');
                    chargerBiens();
                })
                .catch(() => alert('❌ Erreur lors de la suppression'));
        }
    };

    if (loading) {
        return <div style={{ textAlign: 'center', padding: '50px', color: '#999' }}>⏳ Chargement...</div>;
    }

    return (
        <div>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '30px',
                flexWrap: 'wrap',
                gap: '15px'
            }}>
                <h2 style={{
                    fontSize: '1.8rem',
                    fontWeight: '300',
                    color: '#1a1a2e',
                    margin: 0
                }}>
                    🏠 Nos biens
                    <span style={{
                        fontSize: '0.9rem',
                        color: '#999',
                        fontWeight: '400',
                        marginLeft: '12px'
                    }}>
                        ({biens.length} biens)
                    </span>
                </h2>
                {/* Le bouton "Ajouter" est maintenant dans le Dashboard */}
            </div>

            {biens.length === 0 ? (
                <div style={{
                    textAlign: 'center',
                    padding: '60px 20px',
                    background: 'white',
                    borderRadius: '16px',
                    border: '1px solid #f0ebe6'
                }}>
                    <div style={{ fontSize: '3rem', marginBottom: '15px' }}>🏠</div>
                    <h3 style={{ fontWeight: '300', color: '#1a1a2e', marginBottom: '10px' }}>
                        Aucun bien disponible
                    </h3>
                    <p style={{ color: '#999' }}>
                        {user ? 'Ajoutez votre premier bien depuis le Dashboard.' : 'Connectez-vous pour ajouter un bien.'}
                    </p>
                    {user ? (
                        <Link to="/dashboard" style={{
                            display: 'inline-block',
                            marginTop: '20px',
                            background: '#1a1a2e',
                            color: 'white',
                            padding: '10px 30px',
                            borderRadius: '50px',
                            textDecoration: 'none'
                        }}>
                            📊 Aller au Dashboard
                        </Link>
                    ) : (
                        <Link to="/connexion" style={{
                            display: 'inline-block',
                            marginTop: '20px',
                            background: '#1a1a2e',
                            color: 'white',
                            padding: '10px 30px',
                            borderRadius: '50px',
                            textDecoration: 'none'
                        }}>
                            🔐 Se connecter
                        </Link>
                    )}
                </div>
            ) : (
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '25px'
                }}>
                    {biens.map((bien) => (
                        <div key={bien.id} style={{
                            background: 'white',
                            borderRadius: '16px',
                            padding: '24px',
                            boxShadow: '0 2px 20px rgba(0,0,0,0.04)',
                            border: '1px solid #f0ebe6'
                        }}>
                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'flex-start',
                                marginBottom: '12px'
                            }}>
                                <div>
                                    <h4 style={{
                                        fontSize: '1rem',
                                        fontWeight: '600',
                                        margin: 0,
                                        color: '#1a1a2e'
                                    }}>
                                        {bien.type || 'Bien'} {bien.reference}
                                    </h4>
                                    <p style={{
                                        color: '#999',
                                        fontSize: '0.85rem',
                                        margin: '4px 0 0'
                                    }}>
                                        📍 {bien.ville || 'Ville non renseignée'}
                                    </p>
                                </div>
                                <span style={{
                                    background: bien.statut === 'disponible' ? '#e8f5e9' : 
                                               bien.statut === 'loue' ? '#fff3e0' : '#f5f0eb',
                                    color: bien.statut === 'disponible' ? '#2e7d32' : 
                                           bien.statut === 'loue' ? '#e65100' : '#888',
                                    padding: '4px 14px',
                                    borderRadius: '50px',
                                    fontSize: '0.7rem',
                                    fontWeight: '500',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.5px'
                                }}>
                                    {bien.statut || 'Statut inconnu'}
                                </span>
                            </div>

                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: '1fr 1fr',
                                gap: '8px',
                                marginTop: '12px',
                                paddingTop: '12px',
                                borderTop: '1px solid #f5f0eb'
                            }}>
                                <div>
                                    <p style={{ fontSize: '0.7rem', color: '#bbb', margin: 0, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Superficie</p>
                                    <p style={{ fontWeight: '500', margin: 0, color: '#555' }}>{bien.superficie || 'N/A'} m²</p>
                                </div>
                                <div>
                                    <p style={{ fontSize: '0.7rem', color: '#bbb', margin: 0, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Pièces</p>
                                    <p style={{ fontWeight: '500', margin: 0, color: '#555' }}>{bien.nombrePieces || 'N/A'}</p>
                                </div>
                                <div style={{ gridColumn: '1 / -1' }}>
                                    <p style={{ fontSize: '0.7rem', color: '#bbb', margin: 0, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Loyer mensuel</p>
                                    <p style={{
                                        fontWeight: '600',
                                        color: '#1a1a2e',
                                        fontSize: '1.1rem',
                                        margin: 0
                                    }}>
                                        {bien.loyerMensuel ? bien.loyerMensuel.toLocaleString() : 'N/A'} FCFA
                                    </p>
                                </div>
                            </div>

                            {/* Boutons Modifier/Supprimer - UNIQUEMENT POUR ADMIN/PROPRIÉTAIRE */}
                            {user && (user.role === 'admin' || user.role === 'proprietaire') && (
                                <div style={{
                                    display: 'flex',
                                    gap: '10px',
                                    marginTop: '15px',
                                    paddingTop: '15px',
                                    borderTop: '1px solid #f5f0eb'
                                }}>
                                    <Link to={`/modifier-bien/${bien.id}`} style={{
                                        flex: 1,
                                        textAlign: 'center',
                                        background: 'transparent',
                                        color: '#1a1a2e',
                                        border: '1px solid #1a1a2e',
                                        padding: '8px 16px',
                                        borderRadius: '8px',
                                        fontSize: '0.8rem',
                                        textDecoration: 'none'
                                    }}>
                                        ✏️ Modifier
                                    </Link>
                                    <button
                                        onClick={() => supprimerBien(bien.id, bien.reference)}
                                        style={{
                                            flex: 1,
                                            background: 'transparent',
                                            color: '#dc3545',
                                            border: '1px solid #dc3545',
                                            padding: '8px 16px',
                                            borderRadius: '8px',
                                            fontSize: '0.8rem',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        🗑️ Supprimer
                                    </button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Biens;