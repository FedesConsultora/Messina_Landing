import { useState, useEffect } from 'react';

import img1 from '../../assets/img/nosotros/IMG_9882.webp';
import img4 from '../../assets/img/nosotros/111.webp';
import img2 from '../../assets/img/nosotros/Secuencia 01.00_00_53_06.Imagen fija001.webp';
import img3 from '../../assets/img/nosotros/Secuencia 01.00_00_53_06.Imagen fija005.webp';

const ALL_IMAGES = [img1, img4, img2, img3];

// First image is always static (slot 1), the rest cycle in slot 2
const STATIC_IMAGE = ALL_IMAGES[0];
const CYCLING_IMAGES = ALL_IMAGES.slice(1);

const INTERVAL_MS = 4000; // time each image stays visible

const Nosotros = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        if (CYCLING_IMAGES.length <= 1) return; // no need to cycle
        const timer = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % CYCLING_IMAGES.length);
        }, INTERVAL_MS);
        return () => clearInterval(timer);
    }, []);

    return (
        <section id="nosotros" className="nosotros">
            {/* ── Top: label + heading + text ── */}
            <div className="nosotros__top">
                <div className="nosotros__label-col">
                    <span className="nosotros__label">Nosotros</span>
                </div>
                <div className="nosotros__text-col">
                    <h2 className="nosotros__title">
                        Más que una metalúrgica,<br />
                        <span className="nosotros__title--orange">un legado familiar.</span>
                    </h2>
                    <p className="nosotros__body">
                        Somos una empresa familiar que lleva tres generaciones dedicada al oficio del
                        hierro. Nuestra historia se forja en la responsabilidad y el compromiso,
                        evolucionando desde la herrería tradicional hacia soluciones industriales más complejas.
                    </p>
                    <p className="nosotros__body">
                        Nos define un espíritu de personas capaces, dispuestas a resolver cada situación
                        con oficio y seriedad. En Messina, diseñamos con hierro, pero construimos
                        confianza.
                    </p>
                </div>
            </div>

            {/* ── Bottom: two image slots ── */}
            <div className="nosotros__images">
                {/* Slot 1 — static image */}
                <div className="nosotros__img-slot">
                    <img
                        src={STATIC_IMAGE}
                        alt="Messina — equipo de trabajo"
                        className="nosotros__img"
                    />
                </div>

                {/* Slot 2 — cycling images with crossfade */}
                <div className="nosotros__img-slot nosotros__img-slot--cycle">
                    {CYCLING_IMAGES.map((src, i) => (
                        <img
                            key={i}
                            src={src}
                            alt={`Messina — imagen ${i + 2}`}
                            className={`nosotros__img nosotros__img--fade ${i === activeIndex ? 'nosotros__img--visible' : ''
                                }`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Nosotros;
