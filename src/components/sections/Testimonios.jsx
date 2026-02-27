import { useState, useEffect, useCallback, useRef } from 'react';

// ── Arrow icons ─────────────────────────────────────────────────
const ChevronLeft = () => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const ChevronRight = () => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const testimoniosList = [
    {
        id: 1,
        texto: '"Trabajamos con Messina hace más de 10 años. Cada vez que necesitamos algo, sabemos que va a estar bien hecho. Lo que más valoramos es que saben lo que hacen."',
        cliente: 'Cliente 1',
    },
    {
        id: 2,
        texto: '"Necesitábamos una pieza específica de tornería que ya no se conseguía. En Messina no solo la fabricaron, sino que mejoraron el diseño original. Se nota el oficio."',
        cliente: 'Cliente 2',
    },
    {
        id: 3,
        texto: '"Excelente relación calidad-precio. Cumplieron con los plazos pactados y el presupuesto fue justo, sin sorpresas. Es difícil encontrar gente tan responsable hoy en día."',
        cliente: 'Cliente 3',
    },
    {
        id: 4,
        texto: '"Contratamos a Messina para una estructura compleja. Cuando la vimos terminada, superó nuestras expectativas en durabilidad y acabado."',
        cliente: 'Cliente 4',
    },
    {
        id: 5,
        texto: '"Profesionalismo y seriedad en cada trabajo. Los recomendamos sin dudar."',
        cliente: 'Cliente 5',
    },
];

const AUTOPLAY_MS = 5000;

const Testimonios = () => {
    const [current, setCurrent] = useState(0);
    const total = testimoniosList.length;

    const goTo = useCallback((index, dir) => {
        setCurrent(index);
    }, []);

    const next = useCallback(() => {
        setCurrent((prev) => (prev + 1) % total);
    }, [total]);

    const prev = useCallback(() => {
        setCurrent((prev) => (prev - 1 + total) % total);
    }, [total]);

    // Autoplay (pauses on hover)
    const isHovered = useRef(false);
    useEffect(() => {
        const timer = setInterval(() => {
            if (!isHovered.current) next();
        }, AUTOPLAY_MS);
        return () => clearInterval(timer);
    }, [next]);

    // Compute visible positions
    const prevIndex = (current - 1 + total) % total;
    const nextIndex = (current + 1) % total;
    const farPrevIndex = (current - 2 + total) % total;
    const farNextIndex = (current + 2) % total;

    return (
        <section id="testimonios" className="testimonios">
            {/* ── Header centrado ── */}
            <div className="testimonios__header">
                <span className="testimonios__label">Testimonios</span>
                <h2 className="testimonios__title">
                    <span className="testimonios__title--orange">Relaciones que<br />perduran</span>{' '}en el tiempo
                </h2>
            </div>

            {/* ── Slider ── */}
            <div
                className="testimonios__slider-wrapper"
                onMouseEnter={() => (isHovered.current = true)}
                onMouseLeave={() => (isHovered.current = false)}
            >
                <div className="testimonios__slider">
                    {testimoniosList.map((t, i) => {
                        let posClass = 'tslide--hidden';
                        if (i === current) posClass = 'tslide--center';
                        else if (i === prevIndex) posClass = 'tslide--left';
                        else if (i === nextIndex) posClass = 'tslide--right';
                        else if (i === farPrevIndex) posClass = 'tslide--far-left';
                        else if (i === farNextIndex) posClass = 'tslide--far-right';

                        return (
                            <div
                                key={t.id}
                                className={`testimonio-card ${posClass}`}
                                onClick={() => i !== current && goTo(i)}
                                style={{ cursor: i !== current ? 'pointer' : 'default' }}
                            >
                                <div className="testimonio-card__avatar" aria-label={`Avatar ${t.cliente}`} />
                                <p className="testimonio-card__texto">{t.texto}</p>
                                <span className="testimonio-card__cliente">{t.cliente}</span>
                            </div>
                        );
                    })}
                </div>

                {/* ── Arrows ── */}
                <button className="testimonios__arrow testimonios__arrow--left" onClick={prev} aria-label="Anterior">
                    <ChevronLeft />
                </button>
                <button className="testimonios__arrow testimonios__arrow--right" onClick={next} aria-label="Siguiente">
                    <ChevronRight />
                </button>
            </div>

            {/* ── Dots ── */}
            <div className="testimonios__dots">
                {testimoniosList.map((t, i) => (
                    <button
                        key={t.id}
                        className={`testimonios__dot ${i === current ? 'testimonios__dot--active' : ''}`}
                        onClick={() => goTo(i)}
                        aria-label={`Ir a testimonio ${i + 1}`}
                    />
                ))}
            </div>
        </section>
    );
};

export default Testimonios;
