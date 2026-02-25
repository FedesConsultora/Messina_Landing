import { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../assets/logos/messina.svg'


const ArrowIcon = () => (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isHidden, setIsHidden] = useState(false);
    const lastScrollY = useRef(0);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const closeMenu = () => setIsMenuOpen(false);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            // Hide navbar when scrolling down past 80px, show when scrolling up
            if (currentScrollY > lastScrollY.current && currentScrollY > 80) {
                setIsHidden(true);
            } else {
                setIsHidden(false);
            }
            lastScrollY.current = currentScrollY;
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header className={`header ${isHidden ? 'header--hidden' : ''}`}>
            <nav className="nav">
                <NavLink to="/" className="logo-link" onClick={closeMenu}>
                    <img src={logo} alt="Messina Logo" />
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
    );
};

export default Navbar;
