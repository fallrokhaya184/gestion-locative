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
                ? 'rgba(255, 255, 255, 0.95)' 
                : 'rgba(255, 255, 255, 0.98)',
            padding: '16px 0',
            boxShadow: scrolled 
                ? '0 4px 30px rgba(0,0,0,0.08)' 
                : '0 1px 0 rgba(0,0,0,0.05)',
            borderBottom: '1px solid rgba(0,0,0,0.03)',
            position: 'sticky',
            top: 0,
            zIndex: 1000,
            transition: 'all 0.3s ease',
            backdropFilter: 'blur(20px)'
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
                    color: '#1a1a2e',
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px'
                }}>
                    <div style={{
                        width: '44px',
                        height: '44px',
                        background: '#1a1a2e',
                        borderRadius: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '20px',
                        color: 'white',
                        letterSpacing: '-0.5px'
                    }}>
                        G+
                    </div>
                    <div>
                        <span style={{
                            fontSize: '1.4rem',
                            fontWeight: '700',
                            color: '#1a1a2e',
                            letterSpacing: '-0.5px'
                        }}>
                            Gestion Locative
                        </span>
                        <span style={{
                            display: 'block',
                            fontSize: '0.6rem',
                            color: '#999',
                            letterSpacing: '2px',
                            textTransform: 'uppercase',
                            marginTop: '-2px'
                        }}>
                            Immobilier
                        </span>
                    </div>
                </Link>

                {/* Liens */}
                <div style={{
                    display: 'flex',
                    gap: '4px',
                    flexWrap: 'wrap',
                    alignItems: 'center'
                }}>
                    {navLinks.map((link) => (
                        <Link
                            key={link.path}
                            to={link.path}
                            style={{
                                color: isActive(link.path) ? '#1a1a2e' : '#888',
                                textDecoration: 'none',
                                fontSize: '0.9rem',
                                fontWeight: isActive(link.path) ? '600' : '400',
                                padding: '8px 18px',
                                borderRadius: '8px',
                                transition: 'all 0.3s ease',
                                background: isActive(link.path) 
                                    ? '#f5f5f5' 
                                    : 'transparent',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '6px',
                                letterSpacing: '0.2px'
                            }}
                            onMouseEnter={(e) => {
                                if (!isActive(link.path)) {
                                    e.target.style.color = '#1a1a2e';
                                    e.target.style.background = '#f5f5f5';
                                }
                            }}
                            onMouseLeave={(e) => {
                                if (!isActive(link.path)) {
                                    e.target.style.color = '#888';
                                    e.target.style.background = 'transparent';
                                }
                            }}
                        >
                            <span style={{ fontSize: '1rem' }}>{link.icon}</span>
                            {link.label}
                        </Link>
                    ))}
                </div>
            </div>
        </nav>
    );
}

export default Navbar;