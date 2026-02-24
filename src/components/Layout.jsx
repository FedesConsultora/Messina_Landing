import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const Layout = ({ children }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const closeMenu = () => setIsMenuOpen(false);

    return (
        <div className="layout-container">
            <header className="header">
                <nav className="nav">
                    <div className="logo">Messina Landing</div>

                    <button className="menu-toggle" onClick={toggleMenu} aria-label="Toggle menu">
                        <span className={`hamburger ${isMenuOpen ? 'open' : ''}`}></span>
                    </button>

                    <ul className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
                        <li><NavLink to="/" onClick={closeMenu} className={({ isActive }) => isActive ? 'active' : ''}>Home</NavLink></li>
                        <li><NavLink to="/servicios" onClick={closeMenu} className={({ isActive }) => isActive ? 'active' : ''}>Servicios</NavLink></li>
                        <li><NavLink to="/proyectos" onClick={closeMenu} className={({ isActive }) => isActive ? 'active' : ''}>Proyectos</NavLink></li>
                        <li><NavLink to="/testimonios" onClick={closeMenu} className={({ isActive }) => isActive ? 'active' : ''}>Testimonios</NavLink></li>
                        <li><NavLink to="/contacto" onClick={closeMenu} className={({ isActive }) => isActive ? 'active' : ''}>Contacto</NavLink></li>
                    </ul>
                </nav>
            </header>

            <main className="main-content">
                {children}
            </main>

            <footer className="footer">
                <p>&copy; 2026 Messina Landing. Todos los derechos reservados.</p>
            </footer>
        </div>
    );
};

export default Layout;
