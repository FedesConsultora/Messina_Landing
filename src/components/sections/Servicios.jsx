const CircleArrow = () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="8" cy="8" r="7.5" stroke="currentColor" strokeOpacity="0.6" />
        <path d="M5.5 8h5M8 5.5l2.5 2.5-2.5 2.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const serviciosList = [
    {
        id: 1,
        titulo: 'Estructuras y transporte',
        descripcion: 'Fabricación de estructuras metálicas robustas, carros y carretones a medida.',
    },
    {
        id: 2,
        titulo: 'Maquinaria especializada',
        descripcion: 'Desarrollo de máquinas tejedoras de alambre diseñadas para alta durabilidad.',
    },
    {
        id: 3,
        titulo: 'Agroindustria',
        descripcion: 'Silos de autoconsumo para optimizar el rendimiento en el campo.',
    },
    {
        id: 4,
        titulo: 'Servicios técnicos',
        descripcion: 'Tornería de precisión y soluciones en oleohidráulica.',
    },
];

const Servicios = () => (
    <section id="servicios" className="servicios">
        <div className="servicios__inner">
            {/* ── Left: label + title ── */}
            <div className="servicios__left">
                <span className="servicios__label">Servicios</span>
                <h2 className="servicios__title">
                    <span className="servicios__title--orange">Soluciones<br />integrales</span><br />
                    en metal y<br />movimiento
                </h2>
            </div>

            {/* ── Right: 2x2 card grid ── */}
            <div className="servicios__grid">
                {serviciosList.map((s) => (
                    <div key={s.id} className="servicio-card">
                        <h3 className="servicio-card__titulo">{s.titulo}</h3>
                        <div className="servicio-card__img" aria-label={`Imagen ${s.titulo}`} />
                        <p className="servicio-card__desc">{s.descripcion}</p>
                        <a href="https://wa.me/5492345689621" target="_blank" rel="noopener noreferrer" className="btn btn--primary servicio-card__btn">
                            Solicitar Presupuesto <CircleArrow />
                        </a>
                    </div>
                ))}
            </div>
        </div>
    </section>
);

export default Servicios;
