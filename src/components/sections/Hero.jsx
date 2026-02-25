import heroBg from "../../assets/img/background-1.png";

const ArrowIcon = () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M2 8h12M8 2l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const Hero = () => (
    <section className="hero">
        <div className="hero__bg">
            <img src={heroBg} alt="" />
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
                    Mirá todos nuestros servicios
                </a>
            </div>
        </div>
    </section>
);

export default Hero;
