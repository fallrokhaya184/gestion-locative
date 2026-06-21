import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../services/api';

function ModifierBien() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [chargement, setChargement] = useState(true);
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
        statut: 'disponible'
    });

    useEffect(() => {
        api.get(`/biens/${id}`)
            .then(response => {
                const bien = response.data;
                setFormData({
                    reference: bien.reference || '',
                    type: bien.type || '',
                    adresse: bien.adresse || '',
                    ville: bien.ville || '',
                    codePostal: bien.codePostal || '',
                    superficie: bien.superficie || '',
                    nombrePieces: bien.nombrePieces || '',
                    loyerMensuel: bien.loyerMensuel || '',
                    caution: bien.caution || '',
                    statut: bien.statut || 'disponible'
                });
            })
            .catch(() => setErreur('Erreur lors du chargement'))
            .finally(() => setChargement(false));
    }, [id]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErreur('');
        setSucces('');

        try {
            const dataToSend = {
                ...formData,
                superficie: parseFloat(formData.superficie) || 0,
                nombrePieces: parseInt(formData.nombrePieces) || 0,
                loyerMensuel: parseFloat(formData.loyerMensuel) || 0,
                caution: parseFloat(formData.caution) || 0
            };

            await api.put(`/biens/${id}`, dataToSend);
            setSucces('✅ Bien modifié avec succès !');
            setTimeout(() => navigate('/biens'), 1500);
        } catch (error) {
            setErreur('❌ Erreur lors de la modification');
        } finally {
            setLoading(false);
        }
    };

    if (chargement) return <div style={{ textAlign: 'center', padding: '50px' }}>Chargement...</div>;

    return (
        <div style={{ maxWidth: '700px', margin: '0 auto', background: 'white', borderRadius: '20px', padding: '40px', boxShadow: '0 4px 40px rgba(0,0,0,0.04)', border: '1px solid #f0ebe6' }}>
            <h2 style={{ textAlign: 'center', fontSize: '1.5rem', fontWeight: '300', marginBottom: '30px' }}>✏️ Modifier le bien</h2>
            
            {erreur && <div style={{ background: '#f8f0f0', color: '#a94442', padding: '12px', borderRadius: '10px', marginBottom: '20px' }}>⚠️ {erreur}</div>}
            {succes && <div style={{ background: '#e8f5e9', color: '#2e7d32', padding: '12px', borderRadius: '10px', marginBottom: '20px' }}>{succes}</div>}

            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '16px' }}>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '500', color: '#555', textTransform: 'uppercase' }}>Référence *</label>
                    <input type="text" name="reference" style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid #e0d8d0', background: '#faf8f6' }} value={formData.reference} onChange={handleChange} required />
                </div>

                <div style={{ marginBottom: '16px' }}>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '500', color: '#555', textTransform: 'uppercase' }}>Type *</label>
                    <select name="type" style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid #e0d8d0', background: '#faf8f6' }} value={formData.type} onChange={handleChange} required>
                        <option value="">Sélectionner</option>
                        <option value="appartement">Appartement</option>
                        <option value="maison">Maison</option>
                        <option value="bureau">Bureau</option>
                        <option value="studio">Studio</option>
                        <option value="villa">Villa</option>
                    </select>
                </div>

                <div style={{ marginBottom: '16px' }}>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '500', color: '#555', textTransform: 'uppercase' }}>Adresse *</label>
                    <input type="text" name="adresse" style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid #e0d8d0', background: '#faf8f6' }} value={formData.adresse} onChange={handleChange} required />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '12px', marginBottom: '16px' }}>
                    <div>
                        <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '500', color: '#555', textTransform: 'uppercase' }}>Ville *</label>
                        <input type="text" name="ville" style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid #e0d8d0', background: '#faf8f6' }} value={formData.ville} onChange={handleChange} required />
                    </div>
                    <div>
                        <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '500', color: '#555', textTransform: 'uppercase' }}>Code Postal</label>
                        <input type="text" name="codePostal" style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid #e0d8d0', background: '#faf8f6' }} value={formData.codePostal} onChange={handleChange} />
                    </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
                    <div>
                        <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '500', color: '#555', textTransform: 'uppercase' }}>Superficie (m²)</label>
                        <input type="number" name="superficie" style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid #e0d8d0', background: '#faf8f6' }} value={formData.superficie} onChange={handleChange} step="0.01" />
                    </div>
                    <div>
                        <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '500', color: '#555', textTransform: 'uppercase' }}>Pièces</label>
                        <input type="number" name="nombrePieces" style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid #e0d8d0', background: '#faf8f6' }} value={formData.nombrePieces} onChange={handleChange} />
                    </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
                    <div>
                        <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '500', color: '#555', textTransform: 'uppercase' }}>Loyer (FCFA)</label>
                        <input type="number" name="loyerMensuel" style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid #e0d8d0', background: '#faf8f6' }} value={formData.loyerMensuel} onChange={handleChange} />
                    </div>
                    <div>
                        <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '500', color: '#555', textTransform: 'uppercase' }}>Caution (FCFA)</label>
                        <input type="number" name="caution" style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid #e0d8d0', background: '#faf8f6' }} value={formData.caution} onChange={handleChange} />
                    </div>
                </div>

                <div style={{ marginBottom: '24px' }}>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '500', color: '#555', textTransform: 'uppercase' }}>Statut</label>
                    <select name="statut" style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid #e0d8d0', background: '#faf8f6' }} value={formData.statut} onChange={handleChange}>
                        <option value="disponible">Disponible</option>
                        <option value="loue">Loué</option>
                        <option value="maintenance">En maintenance</option>
                    </select>
                </div>

                <div style={{ display: 'flex', gap: '12px' }}>
                    <button type="submit" disabled={loading} style={{ flex: 1, padding: '14px', background: loading ? '#999' : '#1a1a2e', color: 'white', border: 'none', borderRadius: '10px', fontSize: '0.9rem', fontWeight: '500', cursor: loading ? 'not-allowed' : 'pointer' }}>
                        {loading ? 'Modification...' : 'Modifier le bien'}
                    </button>
                    <button type="button" onClick={() => navigate('/biens')} style={{ padding: '14px 30px', background: 'transparent', color: '#666', border: '1px solid #e0d8d0', borderRadius: '10px', cursor: 'pointer' }}>
                        Annuler
                    </button>
                </div>
            </form>
        </div>
    );
}

export default ModifierBien;