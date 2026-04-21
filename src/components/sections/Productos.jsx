import { useState, useEffect, useRef } from 'react';
import BrochureModal from './BrochureModal';

// ── Images ───────────────────────────────────────────────────────
import img0 from '../../assets/img/productos/img0.webp';
import img1 from '../../assets/img/productos/img1.webp';
import img2 from '../../assets/img/productos/img2.webp';
import img3 from '../../assets/img/productos/img3.webp';
import img4 from '../../assets/img/productos/img4.webp';
import img5 from '../../assets/img/productos/img5.webp';
import img6 from '../../assets/img/productos/img6.webp';
import img7 from '../../assets/img/productos/img7.webp';
import img8 from '../../assets/img/productos/img8.webp';

const machineImages = [img0, img1, img2, img3, img4, img5, img6, img7, img8];

const Productos = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [activeImg, setActiveImg] = useState(0);
    const lastInteraction = useRef(Date.now());

    useEffect(() => {
        const interval = setInterval(() => {
            const now = Date.now();
            const timeSinceInteraction = now - lastInteraction.current;
            
            // Resume auto-rotation if no interaction in the last 60 seconds
            if (timeSinceInteraction >= 60000) {
                setActiveImg((prev) => (prev + 1) % machineImages.length);
            }
        }, 4000); // Change image every 4 seconds when active

        return () => clearInterval(interval);
    }, []);

    const handleImgChange = (idx) => {
        lastInteraction.current = Date.now();
        setActiveImg(idx);
    };

    const features = [
        "Diferentes medidas de rombos y alturas.",
        "Totalmente automática.",
        "Hace un rollo de medida estándar en tan solo 20 minutos.",
        "Fabricada en su totalidad en nuestra metalúrgica."
    ];

    return (
        <section id="productos" className="productos">
            <div className="productos__container">
                <div className="productos__header">
                    <span className="productos__label">Producto Destacado</span>
                    <h2 className="productos__title">
                        Nuestra <span className="productos__title--orange">Máquina Tejedora</span>
                    </h2>
                    <p className="productos__subtitle">
                        Diseño y fabricación propia: la solución definitiva para la producción de tejido romboidal.
                    </p>
                </div>

                <div className="productos__spotlight">
                    {/* ── Left: Image Gallery ── */}
                    <div className="productos__gallery">
                        <div className="productos__main-image-wrapper">
                            <img
                                key={activeImg}
                                src={machineImages[activeImg]}
                                alt="Máquina Tejedora Messina"
                                className="productos__main-image productos__main-image--fade"
                            />
                        </div>
                        <div className="productos__thumbnails">
                            {machineImages.map((img, idx) => (
                                <button
                                    key={idx}
                                    className={`productos__thumb ${activeImg === idx ? 'active' : ''}`}
                                    onClick={() => handleImgChange(idx)}
                                >
                                    <img src={img} alt={`Vista ${idx + 1}`} />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* ── Right: Product Info ── */}
                    <div className="productos__info">
                        <div className="productos__info-card">
                            <h3 className="productos__info-title">Máquina para tejido romboidal</h3>
                            <p className="productos__info-description">
                                Una solución propia diseñada para garantizar la calidad en cada rollo de tejido.
                            </p>

                            <ul className="productos__features-list">
                                {features.map((feature, idx) => (
                                    <li key={idx} className="productos__feature-item">
                                        <span className="productos__feature-icon">
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                                <polyline points="20 6 9 17 4 12"></polyline>
                                            </svg>
                                        </span>
                                        {feature}
                                    </li>
                                ))}
                            </ul>

                            <div className="productos__actions">
                                <button
                                    className="btn btn--primary"
                                    onClick={() => setIsModalOpen(true)}
                                >
                                    Descargar catálogo completo
                                </button>
                                <p className="productos__actions-hint">
                                    ¿Buscás otras soluciones? Descargá nuestro catálogo con todos nuestros prodcutos.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <BrochureModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </section>
    );
};

export default Productos;
