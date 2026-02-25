const ArrowIcon = () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M2 8h12M8 2l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const Hero = () => (
    <section className="hero">
        {/* Background SVG placeholder – replace with real image when available */}
        <div className="hero__bg">
            <svg className="hero__bg-svg" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
                <defs>
                    <radialGradient id="rg1" cx="65%" cy="40%" r="55%">
                        <stop offset="0%" stopColor="#2a3a50" />
                        <stop offset="100%" stopColor="#060a0f" />
                    </radialGradient>
                </defs>
                <rect width="100%" height="100%" fill="url(#rg1)" />
                <line x1="0" y1="0" x2="100%" y2="100%" stroke="rgba(255,255,255,0.03)" strokeWidth="160" />
                <line x1="-10%" y1="20%" x2="110%" y2="80%" stroke="rgba(255,255,255,0.02)" strokeWidth="100" />
                <ellipse cx="68%" cy="38%" rx="30%" ry="25%" fill="rgba(255,160,30,0.07)" />
            </svg>
        </div>

        <div className="hero__content">
            <p className="hero__badge">+1000 clientes satisfechos</p>

            <h1 className="hero__title">
                <span className="hero__title--orange">Soluciones<br />metálicas</span>
                {' '}que<br />perduran en el<br />tiempo
            </h1>

            <p className="hero__subtitle">
                Tres generaciones uniendo tradición y tecnología en el trabajo del hierro.<br />
                Estructuras, maquinaria y oleohidráulica con precisión garantizada.
            </p>

            <div className="hero__actions">
                <a href="/contacto" className="btn btn--primary">
                    Solicitar Presupuesto <ArrowIcon />
                </a>
                <a href="/servicios" className="btn btn--outline">
                    Mira todos nuestros servicios
                </a>
            </div>
        </div>
    </section>
);

export default Hero;
