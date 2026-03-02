import { useState, useEffect } from 'react';

import img1 from '../../assets/img/nosotros/IMG_9882.webp';
import img4 from '../../assets/img/nosotros/111.webp';
import img2 from '../../assets/img/nosotros/Secuencia 01.00_00_53_06.Imagen fija001.webp';

// Split images between two slots — 2 per slot
const SLOT1_IMAGES = [img1, img4];
const SLOT2_IMAGES = [img2];

const INTERVAL_MS = 4000;

const Nosotros = () => {
    const [index1, setIndex1] = useState(0);
    const [index2, setIndex2] = useState(0);

    // Slot 1 cycling
    useEffect(() => {
        if (SLOT1_IMAGES.length <= 1) return;
        const timer = setInterval(() => {
            setIndex1((prev) => (prev + 1) % SLOT1_IMAGES.length);
        }, INTERVAL_MS);
        return () => clearInterval(timer);
    }, []);

    // Slot 2 cycling — staggered by 2s so they don't switch at the same time
    useEffect(() => {
        if (SLOT2_IMAGES.length <= 1) return;
        const timeout = setTimeout(() => {
            setIndex2((prev) => (prev + 1) % SLOT2_IMAGES.length);
            const timer = setInterval(() => {
                setIndex2((prev) => (prev + 1) % SLOT2_IMAGES.length);
            }, INTERVAL_MS);
            return () => clearInterval(timer);
        }, 2000);
        return () => clearTimeout(timeout);
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

            {/* ── Bottom: two image slots, both cycling ── */}
            <div className="nosotros__images">
                {/* Slot 1 */}
                <div className="nosotros__img-slot nosotros__img-slot--cycle">
                    {SLOT1_IMAGES.map((src, i) => (
                        <img
                            key={i}
                            src={src}
                            alt={`Messina — imagen ${i + 1}`}
                            className={`nosotros__img nosotros__img--fade ${i === index1 ? 'nosotros__img--visible' : ''
                                }`}
                        />
                    ))}
                </div>

                {/* Slot 2 */}
                <div className="nosotros__img-slot nosotros__img-slot--cycle">
                    {SLOT2_IMAGES.map((src, i) => (
                        <img
                            key={i}
                            src={src}
                            alt={`Messina — imagen ${i + 3}`}
                            className={`nosotros__img nosotros__img--fade ${i === index2 ? 'nosotros__img--visible' : ''
                                }`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Nosotros;
