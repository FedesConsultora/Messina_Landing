import { useState, useEffect, useRef } from 'react';
import logo from '../assets/logos/messina.svg'


const ArrowIcon = () => (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const SECTIONS = ['inicio', 'nosotros', 'servicios', 'ventajas', 'proyectos', 'testimonios'];

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isHidden, setIsHidden] = useState(false);
    const [activeSection, setActiveSection] = useState('inicio');
    const lastScrollY = useRef(0);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const closeMenu = () => setIsMenuOpen(false);

    // Lock body scroll when menu is open (works on iOS too)
    useEffect(() => {
        if (isMenuOpen) {
            const scrollY = window.scrollY;
            document.documentElement.style.overflow = 'hidden';
            document.documentElement.style.overflowX = 'hidden';
            document.body.style.overflow = 'hidden';
            document.body.style.overflowX = 'hidden';
            document.body.style.position = 'fixed';
            document.body.style.top = `-${scrollY}px`;
            document.body.style.width = '100%';
            document.body.style.maxWidth = '100vw';
        } else {
            const scrollY = document.body.style.top;
            document.documentElement.style.overflow = '';
            document.documentElement.style.overflowX = '';
            document.body.style.overflow = '';
            document.body.style.overflowX = '';
            document.body.style.position = '';
            document.body.style.top = '';
            document.body.style.width = '';
            document.body.style.maxWidth = '';
            if (scrollY) {
                window.scrollTo(0, parseInt(scrollY || '0') * -1);
            }
        }
        return () => {
            document.documentElement.style.overflow = '';
            document.documentElement.style.overflowX = '';
            document.body.style.overflow = '';
            document.body.style.overflowX = '';
            document.body.style.position = '';
            document.body.style.top = '';
            document.body.style.width = '';
            document.body.style.maxWidth = '';
        };
    }, [isMenuOpen]);

    // Detect active section via IntersectionObserver
    useEffect(() => {
        const observers = [];
        SECTIONS.forEach((id) => {
            const el = document.getElementById(id);
            if (!el) return;
            const observer = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting) {
                        setActiveSection(id);
                    }
                },
                { threshold: 0.4 }
            );
            observer.observe(el);
            observers.push(observer);
        });
        return () => observers.forEach((o) => o.disconnect());
    }, []);

    const scrollTo = (id) => {
        closeMenu();
        const el = document.getElementById(id);
        if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
        }
    };

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            const delta = currentScrollY - lastScrollY.current;

            // Only toggle after a meaningful scroll (5px threshold)
            if (Math.abs(delta) < 5) return;

            if (delta > 0 && currentScrollY > 80) {
                setIsHidden(true);
            } else if (delta < 0) {
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
                <a href="#inicio" className="logo-link" onClick={() => scrollTo('inicio')}>
                    <img src={logo} alt="Messina Logo" />
                </a>

                <button className="menu-toggle" onClick={toggleMenu} aria-label="Toggle menu">
                    {isMenuOpen ? (
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M18 6L6 18M6 6l12 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    ) : (
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3 6h18M3 12h18M3 18h18" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    )}
                </button>

                {/* ── Backdrop overlay (mobile) ── */}
                <div
                    className={`nav-overlay ${isMenuOpen ? 'open' : ''}`}
                    onClick={closeMenu}
                />

                <ul className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
                    {SECTIONS.map((id) => (
                        <li key={id}>
                            <a
                                href={`#${id}`}
                                className={activeSection === id ? 'nav-active' : ''}
                                onClick={() => scrollTo(id)}
                            > {activeSection === id ? "●" : ""}
                                {""} {""} {id.charAt(0).toUpperCase() + id.slice(1)}
                            </a>
                        </li>
                    ))}
                </ul>

                <a href="https://wa.me/5492345689621" target="_blank" rel="noopener noreferrer" className="btn-contacto">
                    Contactanos <ArrowIcon />
                </a>
            </nav>
        </header>
    );
};

export default Navbar;
