import React, { useState, useEffect } from 'react';
import api from '../services/api';

function Biens() {
    const [biens, setBiens] = useState([]);
    const [loading, setLoading] = useState(true);
    const [erreur, setErreur] = useState('');

    useEffect(() => {
        const fetchBiens = async () => {
            try {
                console.log('🔍 Tentative de connexion à :', api.defaults.baseURL + '/biens');
                const response = await api.get('/biens');
                console.log('✅ Données reçues :', response.data);
                setBiens(response.data);
            } catch (error) {
                console.error('❌ Erreur complète :', error);
                console.error('❌ Message :', error.message);
                console.error('❌ Réponse :', error.response);
                setErreur(`Erreur : ${error.message}. Vérifie que le backend tourne sur http://localhost:8080`);
            } finally {
                setLoading(false);
            }
        };
        fetchBiens();
    }, []);

    if (loading) {
        return (
            <div style={{ textAlign: 'center', padding: '50px' }}>
                <div style={{ fontSize: '2rem' }}>⏳</div>
                <p>Chargement des biens...</p>
            </div>
        );
    }

    if (erreur) {
        return (
            <div style={{
                background: '#fff3cd',
                border: '1px solid #ffc107',
                borderRadius: '8px',
                padding: '20px',
                color: '#856404'
            }}>
                <strong>⚠️ {erreur}</strong>
                <br />
                <small>Vérifie que :</small>
                <ul>
                    <li>Le backend tourne sur http://localhost:8080</li>
                    <li>Tu as bien lancé `npm start` dans le dossier frontend</li>
                </ul>
            </div>
        );
    }

    if (biens.length === 0) {
        return (
            <div style={{ textAlign: 'center', padding: '50px' }}>
                <h2>🏠 Aucun bien disponible</h2>
                <p>Ajoutez votre premier bien depuis l'administration.</p>
            </div>
        );
    }

    return (
        <div>
            <h2 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '30px' }}>
                🏠 Nos biens disponibles
            </h2>
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
                        boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                        border: '1px solid #f0f0f0',
                        transition: 'transform 0.3s ease, box-shadow 0.3s ease'
                    }}>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'flex-start',
                            marginBottom: '15px'
                        }}>
                            <div>
                                <h4 style={{
                                    fontSize: '1.2rem',
                                    fontWeight: '700',
                                    margin: 0,
                                    color: '#1a1a2e'
                                }}>
                                    {bien.type || 'Bien'} - {bien.reference || 'N/A'}
                                </h4>
                                <p style={{
                                    color: '#666',
                                    fontSize: '0.9rem',
                                    margin: '5px 0 0'
                                }}>
                                    {bien.ville || 'Ville non renseignée'}
                                </p>
                            </div>
                            <span style={{
                                background: bien.statut === 'disponible' ? '#d4edda' : '#f8d7da',
                                color: bien.statut === 'disponible' ? '#155724' : '#721c24',
                                padding: '4px 14px',
                                borderRadius: '50px',
                                fontSize: '0.75rem',
                                fontWeight: '600',
                                textTransform: 'uppercase'
                            }}>
                                {bien.statut || 'Statut inconnu'}
                            </span>
                        </div>

                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: '1fr 1fr',
                            gap: '10px',
                            marginTop: '15px',
                            paddingTop: '15px',
                            borderTop: '1px solid #f0f0f0'
                        }}>
                            <div>
                                <p style={{ fontSize: '0.75rem', color: '#999', margin: 0 }}>Superficie</p>
                                <p style={{ fontWeight: '600', margin: 0 }}>{bien.superficie || 'N/A'} m²</p>
                            </div>
                            <div>
                                <p style={{ fontSize: '0.75rem', color: '#999', margin: 0 }}>Pièces</p>
                                <p style={{ fontWeight: '600', margin: 0 }}>{bien.nombrePieces || 'N/A'}</p>
                            </div>
                            <div style={{ gridColumn: '1 / -1' }}>
                                <p style={{ fontSize: '0.75rem', color: '#999', margin: 0 }}>Loyer mensuel</p>
                                <p style={{ fontWeight: '700', color: '#667eea', fontSize: '1.2rem', margin: 0 }}>
                                    {bien.loyerMensuel ? bien.loyerMensuel.toLocaleString() : 'N/A'} FCFA
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Biens;