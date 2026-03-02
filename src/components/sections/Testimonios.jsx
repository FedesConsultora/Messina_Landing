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

// ── Avatar icon (inline SVG, no library needed) ──────────────────
const AvatarIcon = () => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="#EB8223" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="8" r="4" />
        <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
    </svg>
);

const testimoniosList = [
    {
        id: 1,
        texto: '"Conozco a la familia desde hace años. Cuando les encargo una estructura, sé que va a durar toda la vida. Son directos y saben lo que hacen."',
        cliente: 'Cliente 1',
    },
    {
        id: 2,
        texto: '"Necesitábamos una pieza específica de tornería que ya no se conseguía. En Messina no solo la fabricaron, sino que mejoraron el diseño original. Se nota el oficio".',
        cliente: 'Cliente 2',
    },
    {
        id: 3,
        texto: '"Excelente relación calidad-precio. Cumplieron con los plazos pactados y el presupuesto fue justo, sin sorpresas. Es difícil encontrar gente tan responsable hoy en día".',
        cliente: 'Cliente 3',
    },
    {
        id: 4,
        texto: '"Contratamos a Messina para una estructura compleja. Cuando la vimos terminada, superó nuestras expectativas en durabilidad y acabado."',
        cliente: 'Cliente 4'
    },

    {
        id: 5,
        texto: '"Les encargamos bebederos rurales para el campo y el resultado fue excelente. Vinieron a medir, nos asesoraron con el diseño y la terminación de las soldaduras es impecable. Gente seria y cumplidora."',
        cliente: 'Cliente 5'
    },

    {
        id: 6,
        texto: '"El servicio es que ofrecen es muy bueno: desde el diseño de la estructura hasta el último bulón. Destaco tambien la transparencia en el presupuesto y la calidad de los materiales utilizados. Sin dudas, nuestro referente para cualquier obra metálica."',
        cliente: 'Cliente 6'
    },

    {
        id: 7,
        texto: '"Adquirimos una tejedora de alambrado y la atención post-venta fue clave. La durabilidad de los componentes es notable; se nota que está hecha con personas de oficio metalúrgico."',
        cliente: 'Cliente 7'
    },

    {
        id: 8,
        texto: '"Los contratamos para la construcción de un galpón de 20x40.. Lo que más destaco es la solidez de la estructura y el asesoramiento previo; no solo cumplen con los plazos de montaje, sino que los detalles de terminación en la zinguería son impecables.”',
        cliente: 'Cliente 8',
    },

];

const AUTOPLAY_MS = 5000;

const Testimonios = () => {
    const [current, setCurrent] = useState(0);
    const total = testimoniosList.length;
    const isPaused = useRef(false);

    const moveNext = useCallback(() => {
        setCurrent((prev) => (prev + 1) % total);
    }, [total]);

    const movePrev = useCallback(() => {
        setCurrent((prev) => (prev - 1 + total) % total);
    }, [total]);

    const goTo = useCallback((index) => {
        setCurrent(index);
        isPaused.current = true;
    }, []);

    const next = useCallback(() => {
        moveNext();
        isPaused.current = true;
    }, [moveNext]);

    const prev = useCallback(() => {
        movePrev();
        isPaused.current = true;
    }, [movePrev]);

    const sectionRef = useRef(null);

    // Intersection Observer to resume animation when returning to the section
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                // If the section leaves the viewport (isIntersecting: false),
                // we reset the paused state so it moves again next time it's seen.
                if (!entry.isIntersecting) {
                    isPaused.current = false;
                }
            },
            { threshold: 0 }
        );

        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    // Autoplay (pauses on hover or after interaction)
    const isHovered = useRef(false);
    useEffect(() => {
        const timer = setInterval(() => {
            if (!isHovered.current && !isPaused.current) {
                setCurrent((prev) => (prev + 1) % total);
            }
        }, AUTOPLAY_MS);
        return () => clearInterval(timer);
    }, [total]);

    // Swipe support
    const touchStartX = useRef(null);
    const touchEndX = useRef(null);
    const minSwipeDistance = 50;

    const onTouchStart = (e) => {
        touchEndX.current = null;
        touchStartX.current = e.targetTouches[0].clientX;
    };

    const onTouchMove = (e) => {
        touchEndX.current = e.targetTouches[0].clientX;
    };

    const onTouchEnd = () => {
        if (!touchStartX.current || !touchEndX.current) return;
        const distance = touchStartX.current - touchEndX.current;
        const isLeftSwipe = distance > minSwipeDistance;
        const isRightSwipe = distance < -minSwipeDistance;

        if (isLeftSwipe) {
            next();
        } else if (isRightSwipe) {
            prev();
        }
    };

    // Compute visible positions
    const prevIndex = (current - 1 + total) % total;
    const nextIndex = (current + 1) % total;

    return (
        <section id="testimonios" className="testimonios" ref={sectionRef}>
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
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
            >
                <div className="testimonios__slider">
                    {testimoniosList.map((t, i) => {
                        let posClass = 'tslide--hidden';
                        if (i === current) posClass = 'tslide--center';
                        else if (i === prevIndex) posClass = 'tslide--left';
                        else if (i === nextIndex) posClass = 'tslide--right';

                        return (
                            <div
                                key={t.id}
                                className={`testimonio-card ${posClass}`}
                                onClick={() => i !== current && goTo(i)}
                                style={{ cursor: i !== current ? 'pointer' : 'default' }}
                            >
                                <div className="testimonio-card__avatar">
                                    <AvatarIcon />
                                </div>
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
