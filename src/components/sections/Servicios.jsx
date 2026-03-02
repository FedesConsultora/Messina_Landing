import { useState, useEffect, useCallback } from 'react';

// ── Estructuras images ──────────────────────────────
import est1 from '../../assets/img/servicios/estructuras/FDS02495.webp';
import est3 from '../../assets/img/servicios/estructuras/IMG_9747.webp';
import est4 from '../../assets/img/servicios/estructuras/IMG_9774.webp';
import est5 from '../../assets/img/servicios/estructuras/IMG_9862.webp';

// ── Maquinaria images ───────────────────────────────
import maq1 from '../../assets/img/servicios/maquinaria/IMG_1018.webp';
import maq2 from '../../assets/img/servicios/maquinaria/IMG_1029.webp';
import maq3 from '../../assets/img/servicios/maquinaria/IMG_7881.webp';
import maq4 from '../../assets/img/servicios/maquinaria/IMG_9904.webp';

// ── Agro images ─────────────────────────────────────
import agro1 from '../../assets/img/servicios/agro/IMG_1022.webp';
import agro2 from '../../assets/img/servicios/agro/IMG_9908.webp';

// ── Servicios técnicos images ───────────────────────
import st1 from '../../assets/img/servicios/servicios-tecnicos/FDS02527.webp';
import st2 from '../../assets/img/servicios/servicios-tecnicos/IMG_4909.webp';
import st3 from '../../assets/img/servicios/servicios-tecnicos/IMG_4917.webp';
import st4 from '../../assets/img/servicios/servicios-tecnicos/IMG_7871.webp';
import st5 from '../../assets/img/servicios/servicios-tecnicos/IMG_9731.webp';
import st6 from '../../assets/img/servicios/servicios-tecnicos/IMG_9787.webp';
import st7 from '../../assets/img/servicios/servicios-tecnicos/IMG_9854.webp';

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
        images: [est1, est3, est4, est5],
    },
    {
        id: 2,
        titulo: 'Maquinaria especializada',
        descripcion: 'Desarrollo de máquinas tejedoras de alambre diseñadas para alta durabilidad.',
        images: [maq1, maq2, maq3, maq4],
    },
    {
        id: 3,
        titulo: 'Agroindustria',
        descripcion: 'Silos de autoconsumo para optimizar el rendimiento en el campo.',
        images: [agro1, agro2],
    },
    {
        id: 4,
        titulo: 'Servicios técnicos',
        descripcion: 'Tornería de precisión y soluciones en oleohidráulica.',
        images: [st1, st2, st3, st4, st5, st6, st7],
    },
];

const INTERVAL_MS = 4000;

/** A single image area that crossfades when there are multiple images. */
const FadeImage = ({ images, label, delay = 0 }) => {
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        if (images.length <= 1) return;
        // Stagger the start so cards don't all switch at once
        const timeout = setTimeout(() => {
            setActiveIndex((prev) => (prev + 1) % images.length);
        }, delay);

        const timer = setTimeout(() => {
            const interval = setInterval(() => {
                setActiveIndex((prev) => (prev + 1) % images.length);
            }, INTERVAL_MS);
            return () => clearInterval(interval);
        }, delay);

        return () => {
            clearTimeout(timeout);
            clearTimeout(timer);
        };
    }, [images.length, delay]);

    // Single image — no fade needed
    if (images.length === 1) {
        return (
            <div className="servicio-card__img-slot">
                <img src={images[0]} alt={label} className="servicio-card__img" />
            </div>
        );
    }

    // Multiple images — crossfade
    return (
        <div className="servicio-card__img-slot servicio-card__img-slot--cycle">
            {images.map((src, i) => (
                <img
                    key={i}
                    src={src}
                    alt={`${label} ${i + 1}`}
                    className={`servicio-card__img servicio-card__img--fade ${i === activeIndex ? 'servicio-card__img--visible' : ''
                        }`}
                />
            ))}
        </div>
    );
};

const Servicios = () => (
    <section id="servicios" className="servicios">
        <div className="servicios__inner">
            {/* ── Left: label + title ── */}
            <div className="servicios__left">
                <span className="servicios__label">Servicios</span>
                <h2 className="servicios__title">
                    <span className="servicios__title--orange">Soluciones<br />metálicas</span><br />
                    que combinan estructura y<br />movimiento
                </h2>
            </div>

            {/* ── Right: 2×2 card grid ── */}
            <div className="servicios__grid">
                {serviciosList.map((s, idx) => (
                    <div key={s.id} className="servicio-card">
                        <h3 className="servicio-card__titulo">{s.titulo}</h3>
                        <FadeImage images={s.images} label={s.titulo} delay={idx * 1000} />
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
