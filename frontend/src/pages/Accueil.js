import React from 'react';
import { Link } from 'react-router-dom';

function Accueil() {
    return (
        <div>
            {/* ========== HERO SECTION ========== */}
            <section style={{
                position: 'relative',
                borderRadius: '20px',
                overflow: 'hidden',
                marginBottom: '50px',
                minHeight: '480px',
                display: 'flex',
                alignItems: 'center',
                background: '#f5f0eb'
            }}>
                {/* Image de fond NETTE - sans opacité */}
                <div style={{
                    position: 'absolute',
                    right: 0,
                    top: 0,
                    width: '55%',
                    height: '100%',
                    background: 'url("https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&h=600&fit=crop&q=80") center/cover',
                    borderRadius: '0 20px 20px 0'
                }} />
                
                {/* Petite ombre légère sur l'image pour lisibilité du texte */}
                <div style={{
                    position: 'absolute',
                    right: 0,
                    top: 0,
                    width: '55%',
                    height: '100%',
                    background: 'linear-gradient(to left, rgba(0,0,0,0.05) 0%, transparent 100%)',
                    borderRadius: '0 20px 20px 0',
                    pointerEvents: 'none'
                }} />
                
                {/* Contenu */}
                <div style={{
                    position: 'relative',
                    zIndex: 1,
                    padding: '60px 50px',
                    maxWidth: '700px'
                }}>
                    <div style={{
                        display: 'inline-block',
                        background: 'rgba(26, 26, 46, 0.08)',
                        padding: '6px 20px',
                        borderRadius: '50px',
                        fontSize: '0.75rem',
                        color: '#555',
                        letterSpacing: '2px',
                        textTransform: 'uppercase',
                        marginBottom: '20px'
                    }}>
                        Gestion Immobilière
                    </div>

                    <h1 style={{
                        fontSize: '3.2rem',
                        fontWeight: '300',
                        color: '#1a1a2e',
                        marginBottom: '15px',
                        letterSpacing: '-1px',
                        lineHeight: '1.1'
                    }}>
                        Gérez vos biens <br />
                        <span style={{
                            fontWeight: '600',
                            color: '#1a1a2e'
                        }}>
                            en toute simplicité
                        </span>
                    </h1>

                    <p style={{
                        fontSize: '1.1rem',
                        color: '#666',
                        maxWidth: '550px',
                        marginBottom: '35px',
                        lineHeight: '1.8'
                    }}>
                        La plateforme élégante pour gérer vos biens immobiliers, 
                        vos locataires et vos finances.
                    </p>

                    <div style={{
                        display: 'flex',
                        gap: '15px',
                        flexWrap: 'wrap'
                    }}>
                        <Link to="/biens" style={{
                            background: '#1a1a2e',
                            color: 'white',
                            padding: '14px 40px',
                            borderRadius: '50px',
                            fontSize: '0.9rem',
                            fontWeight: '500',
                            textDecoration: 'none',
                            letterSpacing: '0.5px',
                            transition: 'all 0.3s ease'
                        }}>
                            Explorer les biens
                        </Link>
                        <Link to="/connexion" style={{
                            background: 'transparent',
                            color: '#1a1a2e',
                            border: '1px solid #1a1a2e',
                            padding: '14px 40px',
                            borderRadius: '50px',
                            fontSize: '0.9rem',
                            fontWeight: '500',
                            textDecoration: 'none',
                            letterSpacing: '0.5px',
                            transition: 'all 0.3s ease'
                        }}>
                            Se connecter
                        </Link>
                    </div>
                </div>
            </section>

            {/* ========== STATISTIQUES ========== */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                gap: '20px',
                marginBottom: '50px'
            }}>
                {[
                    { number: '50+', label: 'Biens gérés', icon: '🏠' },
                    { number: '100+', label: 'Locataires', icon: '👥' },
                    { number: '200+', label: 'Contrats', icon: '📄' },
                    { number: '95%', label: "Taux d'occupation", icon: '📈' }
                ].map((stat, index) => (
                    <div key={index} style={{
                        background: 'white',
                        borderRadius: '16px',
                        padding: '24px 20px',
                        textAlign: 'center',
                        boxShadow: '0 2px 20px rgba(0,0,0,0.04)',
                        border: '1px solid #f0ebe6'
                    }}>
                        <div style={{
                            fontSize: '2rem',
                            marginBottom: '8px'
                        }}>{stat.icon}</div>
                        <h3 style={{
                            fontSize: '1.8rem',
                            fontWeight: '300',
                            color: '#1a1a2e',
                            marginBottom: '4px'
                        }}>{stat.number}</h3>
                        <p style={{ color: '#999', margin: 0, fontSize: '0.85rem' }}>{stat.label}</p>
                    </div>
                ))}
            </div>

            {/* ========== FONCTIONNALITÉS ========== */}
            <h2 style={{
                fontSize: '2rem',
                fontWeight: '300',
                textAlign: 'center',
                color: '#1a1a2e',
                marginBottom: '10px'
            }}>
                Fonctionnalités
            </h2>
            <p style={{
                textAlign: 'center',
                color: '#999',
                maxWidth: '500px',
                margin: '0 auto 40px',
                fontSize: '0.95rem'
            }}>
                Des outils pensés pour simplifier votre quotidien
            </p>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                gap: '25px',
                marginBottom: '50px'
            }}>
                {[
                    { icon: '🏢', title: 'Gestion des biens', desc: 'Suivez vos biens immobiliers en temps réel.' },
                    { icon: '👥', title: 'Gestion des locataires', desc: 'Centralisez les informations de vos locataires.' },
                    { icon: '💰', title: 'Suivi des paiements', desc: 'Visualisez les loyers et leur statut.' },
                    { icon: '📋', title: 'Gestion des contrats', desc: 'Créez et gérez les baux de location.' }
                ].map((item, index) => (
                    <div key={index} style={{
                        background: 'white',
                        borderRadius: '16px',
                        padding: '28px 24px',
                        boxShadow: '0 2px 20px rgba(0,0,0,0.04)',
                        border: '1px solid #f0ebe6',
                        transition: 'transform 0.3s ease'
                    }}>
                        <div style={{
                            fontSize: '2.2rem',
                            marginBottom: '15px'
                        }}>{item.icon}</div>
                        <h5 style={{
                            fontSize: '1rem',
                            fontWeight: '600',
                            color: '#1a1a2e',
                            marginBottom: '8px'
                        }}>
                            {item.title}
                        </h5>
                        <p style={{ color: '#999', lineHeight: '1.7', fontSize: '0.9rem' }}>
                            {item.desc}
                        </p>
                    </div>
                ))}
            </div>

            {/* ========== CTA ========== */}
            <section style={{
                background: '#1a1a2e',
                borderRadius: '20px',
                padding: '50px 40px',
                textAlign: 'center',
                color: 'white'
            }}>
                <h2 style={{
                    fontSize: '1.8rem',
                    fontWeight: '300',
                    marginBottom: '12px'
                }}>
                    Prêt à commencer ?
                </h2>
                <p style={{
                    fontSize: '0.95rem',
                    opacity: 0.7,
                    maxWidth: '500px',
                    margin: '0 auto 30px'
                }}>
                    Rejoignez-nous et simplifiez la gestion de vos biens.
                </p>
                <Link to="/connexion" style={{
                    background: 'white',
                    color: '#1a1a2e',
                    padding: '12px 45px',
                    borderRadius: '50px',
                    fontSize: '0.9rem',
                    fontWeight: '500',
                    textDecoration: 'none',
                    display: 'inline-block'
                }}>
                    Commencer maintenant
                </Link>
            </section>

            {/* ========== FOOTER ========== */}
            <footer style={{
                textAlign: 'center',
                padding: '30px 0',
                marginTop: '30px',
                borderTop: '1px solid #f0ebe6',
                color: '#ccc'
            }}>
                <p style={{ margin: 0, fontSize: '0.85rem' }}>
                    © {new Date().getFullYear()} Gestion Locative
                </p>
                <p style={{ margin: '4px 0 0', fontSize: '0.75rem', color: '#ddd' }}>
                    Groupe 6
                </p>
            </footer>
        </div>
    );
}

export default Accueil;