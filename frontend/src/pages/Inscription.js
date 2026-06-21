import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';

function Inscription() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        nom: '',
        prenom: '',
        email: '',
        motDePasse: '',
        telephone: '',
        role: 'locataire'
    });
    const [loading, setLoading] = useState(false);
    const [erreur, setErreur] = useState('');
    const [succes, setSucces] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErreur('');
        setSucces('');

        // Vérifier les champs obligatoires
        if (!formData.nom || !formData.prenom || !formData.email || !formData.motDePasse) {
            setErreur('Tous les champs marqués * sont obligatoires');
            setLoading(false);
            return;
        }

        try {
            console.log('📤 Envoi des données :', formData);

            const response = await api.post('/utilisateurs/inscription', formData);
            
            console.log('✅ Réponse du serveur :', response.data);

            if (response.data) {
                setSucces('✅ Compte créé avec succès ! Redirection...');
                setTimeout(() => {
                    navigate('/connexion');
                }, 2000);
            }
        } catch (error) {
            console.error('❌ Erreur complète :', error);
            console.error('❌ Réponse du serveur :', error.response);
            
            if (error.response) {
                const message = error.response.data;
                if (typeof message === 'string') {
                    setErreur('❌ ' + message);
                } else {
                    setErreur('❌ Erreur serveur : ' + JSON.stringify(message));
                }
            } else if (error.request) {
                setErreur('❌ Le backend ne répond pas. Vérifie qu\'il tourne sur http://localhost:8080');
            } else {
                setErreur('❌ Erreur : ' + error.message);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '70vh',
            padding: '20px'
        }}>
            <div style={{
                background: 'white',
                borderRadius: '20px',
                padding: '48px 40px',
                maxWidth: '480px',
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
                        ✨
                    </div>
                    <h2 style={{
                        fontSize: '1.5rem',
                        fontWeight: '300',
                        color: '#1a1a2e',
                        marginBottom: '4px'
                    }}>
                        Créer un compte
                    </h2>
                    <p style={{ color: '#999', fontSize: '0.9rem' }}>
                        Rejoignez la plateforme
                    </p>
                </div>

                {erreur && (
                    <div style={{
                        background: '#f8f0f0',
                        color: '#a94442',
                        padding: '12px 16px',
                        borderRadius: '10px',
                        marginBottom: '20px',
                        fontSize: '0.85rem',
                        border: '1px solid #f5d0d0'
                    }}>
                        ⚠️ {erreur}
                    </div>
                )}

                {succes && (
                    <div style={{
                        background: '#e8f5e9',
                        color: '#2e7d32',
                        padding: '12px 16px',
                        borderRadius: '10px',
                        marginBottom: '20px',
                        fontSize: '0.85rem',
                        border: '1px solid #c8e6c9'
                    }}>
                        {succes}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr',
                        gap: '12px'
                    }}>
                        <div style={{ marginBottom: '12px' }}>
                            <label style={{
                                display: 'block',
                                fontSize: '0.75rem',
                                fontWeight: '500',
                                color: '#555',
                                marginBottom: '4px',
                                textTransform: 'uppercase',
                                letterSpacing: '0.5px'
                            }}>
                                Nom *
                            </label>
                            <input
                                type="text"
                                name="nom"
                                style={{
                                    width: '100%',
                                    padding: '10px 14px',
                                    borderRadius: '10px',
                                    border: '1px solid #e0d8d0',
                                    fontSize: '0.9rem',
                                    outline: 'none',
                                    background: '#faf8f6',
                                    transition: 'border-color 0.3s ease'
                                }}
                                value={formData.nom}
                                onChange={handleChange}
                                required
                                placeholder="Votre nom"
                            />
                        </div>
                        <div style={{ marginBottom: '12px' }}>
                            <label style={{
                                display: 'block',
                                fontSize: '0.75rem',
                                fontWeight: '500',
                                color: '#555',
                                marginBottom: '4px',
                                textTransform: 'uppercase',
                                letterSpacing: '0.5px'
                            }}>
                                Prénom *
                            </label>
                            <input
                                type="text"
                                name="prenom"
                                style={{
                                    width: '100%',
                                    padding: '10px 14px',
                                    borderRadius: '10px',
                                    border: '1px solid #e0d8d0',
                                    fontSize: '0.9rem',
                                    outline: 'none',
                                    background: '#faf8f6',
                                    transition: 'border-color 0.3s ease'
                                }}
                                value={formData.prenom}
                                onChange={handleChange}
                                required
                                placeholder="Votre prénom"
                            />
                        </div>
                    </div>

                    <div style={{ marginBottom: '12px' }}>
                        <label style={{
                            display: 'block',
                            fontSize: '0.75rem',
                            fontWeight: '500',
                            color: '#555',
                            marginBottom: '4px',
                            textTransform: 'uppercase',
                            letterSpacing: '0.5px'
                        }}>
                            Email *
                        </label>
                        <input
                            type="email"
                            name="email"
                            style={{
                                width: '100%',
                                padding: '10px 14px',
                                borderRadius: '10px',
                                border: '1px solid #e0d8d0',
                                fontSize: '0.9rem',
                                outline: 'none',
                                background: '#faf8f6',
                                transition: 'border-color 0.3s ease'
                            }}
                            value={formData.email}
                            onChange={handleChange}
                            required
                            placeholder="exemple@email.com"
                        />
                    </div>

                    <div style={{ marginBottom: '12px' }}>
                        <label style={{
                            display: 'block',
                            fontSize: '0.75rem',
                            fontWeight: '500',
                            color: '#555',
                            marginBottom: '4px',
                            textTransform: 'uppercase',
                            letterSpacing: '0.5px'
                        }}>
                            Mot de passe *
                        </label>
                        <input
                            type="password"
                            name="motDePasse"
                            style={{
                                width: '100%',
                                padding: '10px 14px',
                                borderRadius: '10px',
                                border: '1px solid #e0d8d0',
                                fontSize: '0.9rem',
                                outline: 'none',
                                background: '#faf8f6',
                                transition: 'border-color 0.3s ease'
                            }}
                            value={formData.motDePasse}
                            onChange={handleChange}
                            required
                            minLength="6"
                            placeholder="•••••••• (6 caractères min)"
                        />
                    </div>

                    <div style={{ marginBottom: '12px' }}>
                        <label style={{
                            display: 'block',
                            fontSize: '0.75rem',
                            fontWeight: '500',
                            color: '#555',
                            marginBottom: '4px',
                            textTransform: 'uppercase',
                            letterSpacing: '0.5px'
                        }}>
                            Téléphone
                        </label>
                        <input
                            type="text"
                            name="telephone"
                            style={{
                                width: '100%',
                                padding: '10px 14px',
                                borderRadius: '10px',
                                border: '1px solid #e0d8d0',
                                fontSize: '0.9rem',
                                outline: 'none',
                                background: '#faf8f6',
                                transition: 'border-color 0.3s ease'
                            }}
                            value={formData.telephone}
                            onChange={handleChange}
                            placeholder="771234567"
                        />
                    </div>

                    <div style={{ marginBottom: '20px' }}>
                        <label style={{
                            display: 'block',
                            fontSize: '0.75rem',
                            fontWeight: '500',
                            color: '#555',
                            marginBottom: '4px',
                            textTransform: 'uppercase',
                            letterSpacing: '0.5px'
                        }}>
                            Rôle *
                        </label>
                        <select
                            name="role"
                            style={{
                                width: '100%',
                                padding: '10px 14px',
                                borderRadius: '10px',
                                border: '1px solid #e0d8d0',
                                fontSize: '0.9rem',
                                outline: 'none',
                                background: '#faf8f6',
                                transition: 'border-color 0.3s ease',
                                appearance: 'none'
                            }}
                            value={formData.role}
                            onChange={handleChange}
                            required
                        >
                            <option value="locataire">Locataire</option>
                            <option value="proprietaire">Propriétaire</option>
                        </select>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        style={{
                            width: '100%',
                            padding: '14px',
                            background: loading ? '#999' : '#1a1a2e',
                            color: 'white',
                            border: 'none',
                            borderRadius: '10px',
                            fontSize: '0.9rem',
                            fontWeight: '500',
                            cursor: loading ? 'not-allowed' : 'pointer',
                            transition: 'all 0.3s ease',
                            letterSpacing: '0.5px'
                        }}
                    >
                        {loading ? 'Création en cours...' : 'Créer mon compte'}
                    </button>
                </form>

                <div style={{
                    marginTop: '16px',
                    textAlign: 'center',
                    fontSize: '0.85rem',
                    color: '#999'
                }}>
                    Déjà un compte ?{' '}
                    <Link to="/connexion" style={{
                        color: '#1a1a2e',
                        textDecoration: 'none',
                        fontWeight: '500'
                    }}>
                        Se connecter
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Inscription;