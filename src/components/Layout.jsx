import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

// ── SVG placeholder for logo (will be replaced with real SVG) ──
const LogoSVG = () => (
    <div className="logo-wrapper">
        {/* Logo placeholder: "M" icon + wordmark */}
        <div className="logo-icon">
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="36" height="36" rx="4" fill="#E07020" />
                <text x="50%" y="56%" dominantBaseline="middle" textAnchor="middle" fill="white" fontSize="20" fontWeight="bold" fontFamily="Inter, sans-serif">M</text>
            </svg>
        </div>
        <div className="logo-text">
            <span className="logo-name">MESSINA</span>
            <span className="logo-tagline">SOLUCIONES METÁLICAS</span>
        </div>
    </div>
);

// ── Icon helper ─────────────────────────────────────────────────
const CircleCheck = () => (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="7" cy="7" r="6.5" stroke="white" strokeOpacity="0.7" />
        <path d="M4 7l2 2 4-4" stroke="white" strokeOpacity="0.9" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const ArrowIcon = () => (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);


const Layout = ({ children }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const closeMenu = () => setIsMenuOpen(false);

    return (
        <div className="layout-container">

            {/* ── Top Info Bar ─────────────────────────────── */}
            <div className="topbar">
                <div className="topbar__inner">
                    <span className="topbar__item"><CircleCheck /> 8:00 a 15:00 hrs</span>
                    <span className="topbar__item"><CircleCheck /> +123 456 7890</span>
                    <span className="topbar__item"><CircleCheck /> Dirección</span>
                </div>
            </div>

            {/* ── Main Navbar ───────────────────────────────── */}
            <header className="header">
                <nav className="nav">
                    <NavLink to="/" className="logo-link" onClick={closeMenu}>
                        <LogoSVG />
                    </NavLink>

                    <button className="menu-toggle" onClick={toggleMenu} aria-label="Toggle menu">
                        <span className={`hamburger ${isMenuOpen ? 'open' : ''}`}></span>
                    </button>

                    <ul className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
                        <li><NavLink to="/" onClick={closeMenu} className={({ isActive }) => isActive ? 'active' : ''}>Inicio</NavLink></li>
                        <li><NavLink to="/nosotros" onClick={closeMenu} className={({ isActive }) => isActive ? 'active' : ''}>Nosotros</NavLink></li>
                        <li><NavLink to="/servicios" onClick={closeMenu} className={({ isActive }) => isActive ? 'active' : ''}>Servicios</NavLink></li>
                        <li><NavLink to="/ventajas" onClick={closeMenu} className={({ isActive }) => isActive ? 'active' : ''}>Ventajas</NavLink></li>
                        <li><NavLink to="/proyectos" onClick={closeMenu} className={({ isActive }) => isActive ? 'active' : ''}>Proyectos</NavLink></li>
                        <li><NavLink to="/testimonios" onClick={closeMenu} className={({ isActive }) => isActive ? 'active' : ''}>Testimonios</NavLink></li>
                    </ul>

                    <a href="/contacto" className="btn-contacto" onClick={closeMenu}>
                        Contactanos <ArrowIcon />
                    </a>
                </nav>
            </header>

            {/* ── Page Content ─────────────────────────────── */}
            <main className="main-content">
                {children}
            </main>

        </div>
    );
};

export default Layout;
