import { useState, useEffect, useRef, useCallback } from 'react';
import logo from '../assets/logos/messina.svg'


const ArrowIcon = () => (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const SECTIONS = ['inicio', 'nosotros', 'servicios', 'ventajas', 'productos', 'proyectos'/*, 'testimonios'*/];

// Where each nav link actually scrolls to (override target for specific sections)
const SCROLL_TARGETS = {
    ventajas: 'ventajas-content', // skip the image, land on the text
};

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isHidden, setIsHidden] = useState(false);
    const [activeSection, setActiveSection] = useState('inicio');
    const lastScrollY = useRef(0);
    const navLinksRef = useRef(null);

    const toggleMenu = () => setIsMenuOpen((prev) => !prev);
    const closeMenu = useCallback(() => setIsMenuOpen(false), []);

    // Lock body scroll when menu is open — using touchmove prevention (iOS-safe)
    // This avoids position:fixed on body which causes scroll jumps
    useEffect(() => {
        if (!isMenuOpen) return;

        const preventScroll = (e) => {
            // Allow scrolling inside the nav-links panel itself
            if (navLinksRef.current && navLinksRef.current.contains(e.target)) return;
            e.preventDefault();
        };

        document.addEventListener('touchmove', preventScroll, { passive: false });
        document.documentElement.style.overflow = 'hidden';
        document.body.style.overflow = 'hidden';

        return () => {
            document.removeEventListener('touchmove', preventScroll);
            document.documentElement.style.overflow = '';
            document.body.style.overflow = '';
        };
    }, [isMenuOpen]);

    // Close menu when tapping outside the nav-links panel (mobile)
    useEffect(() => {
        if (!isMenuOpen) return;

        const handleTapOutside = (e) => {
            // If tap is inside the nav-links panel, ignore
            if (navLinksRef.current && navLinksRef.current.contains(e.target)) return;
            // If tap is on the menu toggle button, let toggleMenu handle it
            if (e.target.closest('.menu-toggle')) return;
            closeMenu();
        };

        // Use a small delay so the opening tap doesn't immediately close it
        const timer = setTimeout(() => {
            document.addEventListener('touchstart', handleTapOutside, { passive: true });
            document.addEventListener('mousedown', handleTapOutside);
        }, 10);

        return () => {
            clearTimeout(timer);
            document.removeEventListener('touchstart', handleTapOutside);
            document.removeEventListener('mousedown', handleTapOutside);
        };
    }, [isMenuOpen, closeMenu]);

    // Detect active section via scroll position
    useEffect(() => {
        const getActiveSection = () => {
            const navHeight = document.querySelector('.header')?.offsetHeight ?? 60;

            let current = SECTIONS[0];
            for (const id of SECTIONS) {
                const el = document.getElementById(id);
                if (!el) continue;
                const rect = el.getBoundingClientRect();
                if (rect.top <= navHeight + 2) {
                    current = id;
                }
            }
            setActiveSection(current);
        };

        getActiveSection();
        window.addEventListener('scroll', getActiveSection, { passive: true });
        return () => window.removeEventListener('scroll', getActiveSection);
    }, []);

    const scrollTo = (e, id) => {
        e.preventDefault();
        setIsMenuOpen(false);

        // Determine the actual target element
        const targetId = SCROLL_TARGETS[id] || id;
        const el = document.getElementById(targetId);
        if (el) {
            requestAnimationFrame(() => {
                const headerHeight = document.querySelector('.header')?.offsetHeight ?? 60;
                const elementPosition = el.getBoundingClientRect().top + window.scrollY;
                window.scrollTo({
                    top: elementPosition - headerHeight,
                    behavior: 'smooth',
                });
            });
        }
    };

    // Hide/show navbar on scroll direction
    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            const delta = currentScrollY - lastScrollY.current;

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

    // On mobile, tapping anywhere outside the header hides the navbar bar
    useEffect(() => {
        const handleTapOutside = (e) => {
            if (window.innerWidth > 900) return;
            if (isMenuOpen) return;
            const header = document.querySelector('.header');
            if (header && !header.contains(e.target)) {
                setIsHidden(true);
            }
        };

        document.addEventListener('touchstart', handleTapOutside, { passive: true });
        return () => document.removeEventListener('touchstart', handleTapOutside);
    }, [isMenuOpen]);

    return (
        <header className={`header ${isHidden ? 'header--hidden' : ''}`}>
            <nav className="nav">
                <a href="#inicio" className="logo-link" onClick={(e) => scrollTo(e, 'inicio')}>
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

                {/* ── Backdrop overlay (mobile) — visual only, close handled by document listener ── */}
                <div className={`nav-overlay ${isMenuOpen ? 'open' : ''}`} />

                <ul ref={navLinksRef} className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
                    {SECTIONS.map((id) => (
                        <li key={id}>
                            <a
                                href={`#${id}`}
                                className={activeSection === id ? 'nav-active' : ''}
                                onClick={(e) => scrollTo(e, id)}
                            >
                                {id.charAt(0).toUpperCase() + id.slice(1)}
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
