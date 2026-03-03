import { useState, useEffect } from 'react';

import img1 from '../../assets/img/ventajas/FDS02571.webp';
import img2 from '../../assets/img/ventajas/IMG_7894.webp';
import img3 from '../../assets/img/ventajas/IMG_9813.webp';

// Add more images here and the cycling adapts automatically
const ALL_IMAGES = [img1, img2, img3];
const INTERVAL_MS = 4000;

const ventajasList = [
    {
        id: 1,
        titulo: 'Durabilidad y precisión',
        descripcion: 'Nuestro trabajo es sinónimo de resistencia. La prolijidad en la ejecución es nuestra norma.',
    },
    {
        id: 2,
        titulo: 'Precios justos',
        descripcion: 'Ofrecemos una relación costo-calidad honesta y competitiva.',
    },
    {
        id: 3,
        titulo: 'Respuesta directa',
        descripcion: 'Respetamos sus tiempos. Planificamos con eficiencia para cumplir cada entrega.',
    },
];

const Ventajas = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        if (ALL_IMAGES.length <= 1) return;
        const timer = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % ALL_IMAGES.length);
        }, INTERVAL_MS);
        return () => clearInterval(timer);
    }, []);

    return (
        <section id="ventajas" className="ventajas">
            <div className="ventajas__inner">
                {/* ── Left (desktop) / Top (mobile): cycling images ── */}
                <div className="ventajas__img-slot">
                    {ALL_IMAGES.map((src, i) => (
                        <img
                            key={i}
                            src={src}
                            alt={`Ventajas Messina ${i + 1}`}
                            className={`ventajas__img ${i === activeIndex ? 'ventajas__img--visible' : ''
                                }`}
                        />
                    ))}
                </div>

                {/* ── Right (desktop) / Bottom (mobile): title + list ── */}
                <div id="ventajas-content" className="ventajas__content">
                    <h2 className="ventajas__title">¿Por qué<br />elegirnos?</h2>

                    <ul className="ventajas__list">
                        {ventajasList.map((v) => (
                            <li key={v.id} className="ventaja-item">
                                <h3 className="ventaja-item__titulo">{v.titulo}</h3>
                                <p className="ventaja-item__desc">{v.descripcion}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
};

export default Ventajas;
