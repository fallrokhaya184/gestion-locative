import React from 'react';
import { Link } from 'react-router-dom';

function Accueil() {
    return (
        <div>
            {/* HERO SECTION */}
            <section style={{
                background: 'linear-gradient(135deg, #1a1a2e 0%, #2d2b55 50%, #1a1a2e 100%)',
                borderRadius: '24px',
                padding: '80px 40px',
                marginBottom: '50px',
                textAlign: 'center',
                color: 'white',
                position: 'relative',
                overflow: 'hidden'
            }}>
                {/* Effet de fond */}
                <div style={{
                    position: 'absolute',
                    top: '-50%',
                    right: '-20%',
                    width: '600px',
                    height: '600px',
                    borderRadius: '50%',
                    background: 'rgba(102, 126, 234, 0.1)',
                    pointerEvents: 'none'
                }} />
                <div style={{
                    position: 'absolute',
                    bottom: '-40%',
                    left: '-10%',
                    width: '400px',
                    height: '400px',
                    borderRadius: '50%',
                    background: 'rgba(118, 75, 162, 0.08)',
                    pointerEvents: 'none'
                }} />

                <div style={{ position: 'relative', zIndex: 1 }}>
                    <div style={{
                        display: 'inline-block',
                        background: 'rgba(255,255,255,0.08)',
                        padding: '8px 24px',
                        borderRadius: '50px',
                        fontSize: '0.85rem',
                        marginBottom: '20px',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        letterSpacing: '1px',
                        textTransform: 'uppercase'
                    }}>
                        🚀 Gestion Immobilière 2026
                    </div>

                    <h1 style={{
                        fontSize: '3.5rem',
                        fontWeight: '800',
                        marginBottom: '20px',
                        letterSpacing: '-1.5px',
                        lineHeight: '1.1'
                    }}>
                        Gérez vos biens<br />
                        <span style={{
                            background: 'linear-gradient(135deg, #667eea, #764ba2)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent'
                        }}>
                            en toute simplicité
                        </span>
                    </h1>

                    <p style={{
                        fontSize: '1.2rem',
                        maxWidth: '600px',
                        margin: '0 auto 35px',
                        opacity: 0.8,
                        lineHeight: '1.8'
                    }}>
                        La plateforme complète pour gérer vos biens, vos locataires,
                        vos contrats et vos paiements en un seul endroit.
                    </p>

                    <div style={{
                        display: 'flex',
                        gap: '15px',
                        justifyContent: 'center',
                        flexWrap: 'wrap'
                    }}>
                        <Link to="/biens" style={{
                            background: 'linear-gradient(135deg, #667eea, #764ba2)',
                            color: 'white',
                            border: 'none',
                            padding: '14px 40px',
                            borderRadius: '50px',
                            fontSize: '1rem',
                            fontWeight: '600',
                            textDecoration: 'none',
                            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                            boxShadow: '0 4px 20px rgba(102, 126, 234, 0.4)'
                        }}>
                            Explorer les biens →
                        </Link>
                        <Link to="/connexion" style={{
                            background: 'rgba(255,255,255,0.1)',
                            color: 'white',
                            border: '2px solid rgba(255,255,255,0.2)',
                            padding: '14px 40px',
                            borderRadius: '50px',
                            fontSize: '1rem',
                            fontWeight: '600',
                            textDecoration: 'none'
                        }}>
                            Se connecter
                        </Link>
                    </div>
                </div>
            </section>

            {/* STATISTIQUES */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '20px',
                marginBottom: '50px'
            }}>
                {[
                    { number: '50+', label: 'Biens gérés', icon: '🏠', color: '#e8f0fe' },
                    { number: '100+', label: 'Locataires', icon: '👥', color: '#e6f4ea' },
                    { number: '200+', label: 'Contrats', icon: '📄', color: '#fef7e0' },
                    { number: '95%', label: 'Taux d\'occupation', icon: '📈', color: '#fce8e6' }
                ].map((stat, index) => (
                    <div key={index} style={{
                        background: 'white',
                        borderRadius: '20px',
                        padding: '28px 20px',
                        textAlign: 'center',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
                        border: '1px solid #f0f0f0',
                        transition: 'transform 0.3s ease'
                    }}>
                        <div style={{
                            fontSize: '2.5rem',
                            marginBottom: '10px'
                        }}>{stat.icon}</div>
                        <h3 style={{
                            fontSize: '2rem',
                            fontWeight: '700',
                            color: '#1a1a2e',
                            marginBottom: '5px'
                        }}>{stat.number}</h3>
                        <p style={{ color: '#666', margin: 0, fontSize: '0.95rem' }}>{stat.label}</p>
                    </div>
                ))}
            </div>

            {/* FONCTIONNALITÉS */}
            <h2 style={{
                fontSize: '2.2rem',
                fontWeight: '700',
                textAlign: 'center',
                color: '#1a1a2e',
                marginBottom: '15px'
            }}>
                Fonctionnalités principales
            </h2>
            <p style={{
                textAlign: 'center',
                color: '#666',
                maxWidth: '550px',
                margin: '0 auto 40px',
                fontSize: '1.05rem'
            }}>
                Des outils puissants pour simplifier votre quotidien
            </p>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '25px',
                marginBottom: '50px'
            }}>
                {[
                    { icon: '🏢', title: 'Gestion des biens', desc: 'Ajoutez, modifiez et suivez tous vos biens immobiliers en temps réel.', color: '#667eea' },
                    { icon: '👥', title: 'Gestion des locataires', desc: 'Suivez vos locataires et leurs contrats de location facilement.', color: '#f093fb' },
                    { icon: '💰', title: 'Suivi des paiements', desc: 'Visualisez tous les loyers et leur statut de paiement en un coup d\'œil.', color: '#4facfe' },
                    { icon: '📋', title: 'Gestion des contrats', desc: 'Créez et gérez les baux de location en toute simplicité.', color: '#43e97b' },
                    { icon: '📊', title: 'Tableau de bord', desc: 'Analysez la performance de votre patrimoine avec des statistiques.', color: '#fa709a' },
                    { icon: '🛡️', title: 'Sécurisé', desc: 'Données protégées et accès sécurisé pour tous les utilisateurs.', color: '#a18cd1' }
                ].map((item, index) => (
                    <div key={index} style={{
                        background: 'white',
                        borderRadius: '20px',
                        padding: '30px 25px',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
                        border: '1px solid #f0f0f0',
                        transition: 'transform 0.3s ease, box-shadow 0.3s ease'
                    }}>
                        <div style={{
                            width: '60px',
                            height: '60px',
                            borderRadius: '16px',
                            background: `linear-gradient(135deg, ${item.color}, ${item.color}dd)`,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '28px',
                            marginBottom: '18px',
                            color: 'white'
                        }}>
                            {item.icon}
                        </div>
                        <h5 style={{
                            fontSize: '1.15rem',
                            fontWeight: '700',
                            color: '#1a1a2e',
                            marginBottom: '10px'
                        }}>
                            {item.title}
                        </h5>
                        <p style={{ color: '#666', lineHeight: '1.7', fontSize: '0.95rem' }}>
                            {item.desc}
                        </p>
                        <Link to="/connexion" style={{
                            color: item.color,
                            textDecoration: 'none',
                            fontWeight: '600',
                            fontSize: '0.95rem'
                        }}>
                            En savoir plus →
                        </Link>
                    </div>
                ))}
            </div>

            {/* CTA */}
            <section style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                borderRadius: '24px',
                padding: '60px 40px',
                textAlign: 'center',
                color: 'white'
            }}>
                <h2 style={{
                    fontSize: '2.2rem',
                    fontWeight: '700',
                    marginBottom: '15px'
                }}>
                    Prêt à optimiser votre gestion ?
                </h2>
                <p style={{
                    fontSize: '1.1rem',
                    opacity: 0.9,
                    maxWidth: '550px',
                    margin: '0 auto 30px'
                }}>
                    Rejoignez des centaines de propriétaires qui nous font confiance.
                </p>
                <Link to="/connexion" style={{
                    background: 'white',
                    color: '#667eea',
                    padding: '14px 50px',
                    borderRadius: '50px',
                    fontSize: '1.05rem',
                    fontWeight: '700',
                    textDecoration: 'none',
                    display: 'inline-block',
                    transition: 'transform 0.3s ease'
                }}>
                    Commencer maintenant →
                </Link>
            </section>

            {/* FOOTER */}
            <footer style={{
                textAlign: 'center',
                padding: '30px 0',
                marginTop: '30px',
                borderTop: '1px solid #eee',
                color: '#999'
            }}>
                <p style={{ margin: 0, fontSize: '0.95rem' }}>
                    © {new Date().getFullYear()} Gestion Locative - Tous droits réservés
                </p>
                <p style={{ margin: '5px 0 0', fontSize: '0.85rem' }}>
                    Développé avec ❤️ par le Groupe 6
                </p>
            </footer>
        </div>
    );
}

export default Accueil;