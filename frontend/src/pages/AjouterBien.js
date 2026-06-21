import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

function AjouterBien() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [erreur, setErreur] = useState('');
    const [succes, setSucces] = useState('');
    const [formData, setFormData] = useState({
        reference: '',
        type: '',
        adresse: '',
        ville: '',
        codePostal: '',
        superficie: '',
        nombrePieces: '',
        loyerMensuel: '',
        caution: '',
        statut: 'disponible',
        proprietaireId: 2
    });

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

        if (!formData.reference || !formData.type || !formData.adresse || !formData.ville) {
            setErreur('Les champs Référence, Type, Adresse et Ville sont obligatoires');
            setLoading(false);
            return;
        }

        try {
            const dataToSend = {
                ...formData,
                superficie: parseFloat(formData.superficie) || 0,
                nombrePieces: parseInt(formData.nombrePieces) || 0,
                loyerMensuel: parseFloat(formData.loyerMensuel) || 0,
                caution: parseFloat(formData.caution) || 0
            };

            const response = await api.post('/biens', dataToSend);

            if (response.data) {
                setSucces('✅ Bien ajouté avec succès !');
                setTimeout(() => {
                    navigate('/biens');
                }, 1500);
            }
        } catch (error) {
            console.error('Erreur:', error);
            setErreur('❌ Erreur lors de l\'ajout du bien');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{
            maxWidth: '700px',
            margin: '0 auto',
            background: 'white',
            borderRadius: '20px',
            padding: '40px',
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
                    🏠
                </div>
                <h2 style={{
                    fontSize: '1.5rem',
                    fontWeight: '300',
                    color: '#1a1a2e',
                    marginBottom: '4px'
                }}>
                    Ajouter un bien
                </h2>
                <p style={{ color: '#999', fontSize: '0.9rem' }}>
                    Renseignez les informations du nouveau bien
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
                <div style={{ marginBottom: '16px' }}>
                    <label style={{
                        display: 'block',
                        fontSize: '0.75rem',
                        fontWeight: '500',
                        color: '#555',
                        marginBottom: '4px',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px'
                    }}>
                        Référence *
                    </label>
                    <input
                        type="text"
                        name="reference"
                        style={{
                            width: '100%',
                            padding: '10px 14px',
                            borderRadius: '10px',
                            border: '1px solid #e0d8d0',
                            fontSize: '0.9rem',
                            outline: 'none',
                            background: '#faf8f6'
                        }}
                        value={formData.reference}
                        onChange={handleChange}
                        placeholder="ex: B003"
                        required
                    />
                </div>

                <div style={{ marginBottom: '16px' }}>
                    <label style={{
                        display: 'block',
                        fontSize: '0.75rem',
                        fontWeight: '500',
                        color: '#555',
                        marginBottom: '4px',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px'
                    }}>
                        Type *
                    </label>
                    <select
                        name="type"
                        style={{
                            width: '100%',
                            padding: '10px 14px',
                            borderRadius: '10px',
                            border: '1px solid #e0d8d0',
                            fontSize: '0.9rem',
                            outline: 'none',
                            background: '#faf8f6',
                            appearance: 'none'
                        }}
                        value={formData.type}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Sélectionner un type</option>
                        <option value="appartement">Appartement</option>
                        <option value="maison">Maison</option>
                        <option value="bureau">Bureau</option>
                        <option value="studio">Studio</option>
                        <option value="villa">Villa</option>
                    </select>
                </div>

                <div style={{ marginBottom: '16px' }}>
                    <label style={{
                        display: 'block',
                        fontSize: '0.75rem',
                        fontWeight: '500',
                        color: '#555',
                        marginBottom: '4px',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px'
                    }}>
                        Adresse *
                    </label>
                    <input
                        type="text"
                        name="adresse"
                        style={{
                            width: '100%',
                            padding: '10px 14px',
                            borderRadius: '10px',
                            border: '1px solid #e0d8d0',
                            fontSize: '0.9rem',
                            outline: 'none',
                            background: '#faf8f6'
                        }}
                        value={formData.adresse}
                        onChange={handleChange}
                        placeholder="ex: Rue 10, Sicap Liberté"
                        required
                    />
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: '2fr 1fr',
                    gap: '12px',
                    marginBottom: '16px'
                }}>
                    <div>
                        <label style={{
                            display: 'block',
                            fontSize: '0.75rem',
                            fontWeight: '500',
                            color: '#555',
                            marginBottom: '4px',
                            textTransform: 'uppercase',
                            letterSpacing: '0.5px'
                        }}>
                            Ville *
                        </label>
                        <input
                            type="text"
                            name="ville"
                            style={{
                                width: '100%',
                                padding: '10px 14px',
                                borderRadius: '10px',
                                border: '1px solid #e0d8d0',
                                fontSize: '0.9rem',
                                outline: 'none',
                                background: '#faf8f6'
                            }}
                            value={formData.ville}
                            onChange={handleChange}
                            placeholder="ex: Dakar"
                            required
                        />
                    </div>
                    <div>
                        <label style={{
                            display: 'block',
                            fontSize: '0.75rem',
                            fontWeight: '500',
                            color: '#555',
                            marginBottom: '4px',
                            textTransform: 'uppercase',
                            letterSpacing: '0.5px'
                        }}>
                            Code Postal
                        </label>
                        <input
                            type="text"
                            name="codePostal"
                            style={{
                                width: '100%',
                                padding: '10px 14px',
                                borderRadius: '10px',
                                border: '1px solid #e0d8d0',
                                fontSize: '0.9rem',
                                outline: 'none',
                                background: '#faf8f6'
                            }}
                            value={formData.codePostal}
                            onChange={handleChange}
                            placeholder="ex: 10000"
                        />
                    </div>
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '12px',
                    marginBottom: '16px'
                }}>
                    <div>
                        <label style={{
                            display: 'block',
                            fontSize: '0.75rem',
                            fontWeight: '500',
                            color: '#555',
                            marginBottom: '4px',
                            textTransform: 'uppercase',
                            letterSpacing: '0.5px'
                        }}>
                            Superficie (m²)
                        </label>
                        <input
                            type="number"
                            name="superficie"
                            style={{
                                width: '100%',
                                padding: '10px 14px',
                                borderRadius: '10px',
                                border: '1px solid #e0d8d0',
                                fontSize: '0.9rem',
                                outline: 'none',
                                background: '#faf8f6'
                            }}
                            value={formData.superficie}
                            onChange={handleChange}
                            placeholder="85.5"
                            step="0.01"
                        />
                    </div>
                    <div>
                        <label style={{
                            display: 'block',
                            fontSize: '0.75rem',
                            fontWeight: '500',
                            color: '#555',
                            marginBottom: '4px',
                            textTransform: 'uppercase',
                            letterSpacing: '0.5px'
                        }}>
                            Nombre de pièces
                        </label>
                        <input
                            type="number"
                            name="nombrePieces"
                            style={{
                                width: '100%',
                                padding: '10px 14px',
                                borderRadius: '10px',
                                border: '1px solid #e0d8d0',
                                fontSize: '0.9rem',
                                outline: 'none',
                                background: '#faf8f6'
                            }}
                            value={formData.nombrePieces}
                            onChange={handleChange}
                            placeholder="3"
                        />
                    </div>
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '12px',
                    marginBottom: '16px'
                }}>
                    <div>
                        <label style={{
                            display: 'block',
                            fontSize: '0.75rem',
                            fontWeight: '500',
                            color: '#555',
                            marginBottom: '4px',
                            textTransform: 'uppercase',
                            letterSpacing: '0.5px'
                        }}>
                            Loyer mensuel (FCFA)
                        </label>
                        <input
                            type="number"
                            name="loyerMensuel"
                            style={{
                                width: '100%',
                                padding: '10px 14px',
                                borderRadius: '10px',
                                border: '1px solid #e0d8d0',
                                fontSize: '0.9rem',
                                outline: 'none',
                                background: '#faf8f6'
                            }}
                            value={formData.loyerMensuel}
                            onChange={handleChange}
                            placeholder="350000"
                        />
                    </div>
                    <div>
                        <label style={{
                            display: 'block',
                            fontSize: '0.75rem',
                            fontWeight: '500',
                            color: '#555',
                            marginBottom: '4px',
                            textTransform: 'uppercase',
                            letterSpacing: '0.5px'
                        }}>
                            Caution (FCFA)
                        </label>
                        <input
                            type="number"
                            name="caution"
                            style={{
                                width: '100%',
                                padding: '10px 14px',
                                borderRadius: '10px',
                                border: '1px solid #e0d8d0',
                                fontSize: '0.9rem',
                                outline: 'none',
                                background: '#faf8f6'
                            }}
                            value={formData.caution}
                            onChange={handleChange}
                            placeholder="350000"
                        />
                    </div>
                </div>

                <div style={{ marginBottom: '24px' }}>
                    <label style={{
                        display: 'block',
                        fontSize: '0.75rem',
                        fontWeight: '500',
                        color: '#555',
                        marginBottom: '4px',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px'
                    }}>
                        Statut
                    </label>
                    <select
                        name="statut"
                        style={{
                            width: '100%',
                            padding: '10px 14px',
                            borderRadius: '10px',
                            border: '1px solid #e0d8d0',
                            fontSize: '0.9rem',
                            outline: 'none',
                            background: '#faf8f6',
                            appearance: 'none'
                        }}
                        value={formData.statut}
                        onChange={handleChange}
                    >
                        <option value="disponible">Disponible</option>
                        <option value="loue">Loué</option>
                        <option value="maintenance">En maintenance</option>
                    </select>
                </div>

                <div style={{
                    display: 'flex',
                    gap: '12px'
                }}>
                    <button
                        type="submit"
                        disabled={loading}
                        style={{
                            flex: 1,
                            padding: '14px',
                            background: loading ? '#999' : '#1a1a2e',
                            color: 'white',
                            border: 'none',
                            borderRadius: '10px',
                            fontSize: '0.9rem',
                            fontWeight: '500',
                            cursor: loading ? 'not-allowed' : 'pointer',
                            letterSpacing: '0.5px'
                        }}
                    >
                        {loading ? 'Ajout en cours...' : 'Ajouter le bien'}
                    </button>
                    <button
                        type="button"
                        onClick={() => navigate('/biens')}
                        style={{
                            padding: '14px 30px',
                            background: 'transparent',
                            color: '#666',
                            border: '1px solid #e0d8d0',
                            borderRadius: '10px',
                            fontSize: '0.9rem',
                            cursor: 'pointer'
                        }}
                    >
                        Annuler
                    </button>
                </div>
            </form>
        </div>
    );
}

export default AjouterBien;