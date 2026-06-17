import React from 'react';

function BienCard({ bien }) {
    return (
        <div className="card h-100">
            <div className="card-body">
                <h5 className="card-title">{bien.type} - {bien.reference}</h5>
                <h6 className="card-subtitle mb-2 text-muted">
                    {bien.ville}, {bien.codePostal}
                </h6>
                <p className="card-text">
                    <strong>Superficie:</strong> {bien.superficie} m²<br />
                    <strong>Pièces:</strong> {bien.nombrePieces}<br />
                    <strong>Loyer:</strong> {bien.loyerMensuel?.toLocaleString()} FCFA
                </p>
                <span className={`badge ${bien.statut === 'disponible' ? 'bg-success' : 'bg-secondary'}`}>
                    {bien.statut}
                </span>
            </div>
        </div>
    );
}

export default BienCard;