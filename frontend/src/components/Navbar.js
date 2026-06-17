import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

function Navbar() {
    const location = useLocation();
    const [scrolled, setScrolled] = useState(false);

    React.useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { path: '/', label: 'Accueil', icon: '🏠' },
        { path: '/biens', label: 'Biens', icon: '🏢' },
        { path: '/connexion', label: 'Connexion', icon: '🔐' },
        { path: '/dashboard', label: 'Dashboard', icon: '📊' }
    ];

    const isActive = (path) => location.pathname === path;

    return (
        <nav style={{
            background: scrolled 
                ? 'rgba(26, 26, 46, 0.95)' 
                : 'linear-gradient(135deg, #1a1a2e 0%, #2d2b55 50%, #1a1a2e 100%)',
            padding: '16px 0',
            boxShadow: scrolled 
                ? '0 8px 32px rgba(0,0,0,0.3)' 
                : '0 4px 20px rgba(0,0,0,0.2)',
            borderBottom: '1px solid rgba(255,255,255,0.05)',
            position: 'sticky',
            top: 0,
            zIndex: 1000,
            transition: 'all 0.3s ease'
        }}>
            <div style={{
                maxWidth: '1200px',
                margin: '0 auto',
                padding: '0 24px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '15px'
            }}>
                {/* Logo */}
                <Link to="/" style={{
                    color: 'white',
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px'
                }}>
                    <div style={{
                        width: '48px',
                        height: '48px',
                        background: 'linear-gradient(135deg, #667eea, #764ba2)',
                        borderRadius: '14px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '24px',
                        boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)'
                    }}>
                        🏢
                    </div>
                    <div>
                        <span style={{
                            fontSize: '1.6rem',
                            fontWeight: '800',
                            letterSpacing: '-0.5px'
                        }}>
                            Gestion Locative
                        </span>
                        <span style={{
                            display: 'block',
                            fontSize: '0.65rem',
                            opacity: 0.6,
                            letterSpacing: '2px',
                            textTransform: 'uppercase',
                            marginTop: '-2px'
                        }}>
                            Plateforme Immobilière
                        </span>
                    </div>
                </Link>

                {/* Liens */}
                <div style={{
                    display: 'flex',
                    gap: '6px',
                    flexWrap: 'wrap',
                    alignItems: 'center'
                }}>
                    {navLinks.map((link) => (
                        <Link
                            key={link.path}
                            to={link.path}
                            style={{
                                color: isActive(link.path) ? '#fff' : 'rgba(255,255,255,0.7)',
                                textDecoration: 'none',
                                fontSize: '0.95rem',
                                fontWeight: isActive(link.path) ? '700' : '500',
                                padding: '10px 20px',
                                borderRadius: '12px',
                                transition: 'all 0.3s ease',
                                background: isActive(link.path) 
                                    ? 'linear-gradient(135deg, #667eea, #764ba2)' 
                                    : 'transparent',
                                boxShadow: isActive(link.path) 
                                    ? '0 4px 15px rgba(102, 126, 234, 0.3)' 
                                    : 'none',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px'
                            }}
                            onMouseEnter={(e) => {
                                if (!isActive(link.path)) {
                                    e.target.style.color = '#fff';
                                    e.target.style.background = 'rgba(255,255,255,0.08)';
                                }
                            }}
                            onMouseLeave={(e) => {
                                if (!isActive(link.path)) {
                                    e.target.style.color = 'rgba(255,255,255,0.7)';
                                    e.target.style.background = 'transparent';
                                }
                            }}
                        >
                            <span style={{ fontSize: '1.1rem' }}>{link.icon}</span>
                            {link.label}
                        </Link>
                    ))}
                </div>
            </div>
        </nav>
    );
}

export default Navbar;