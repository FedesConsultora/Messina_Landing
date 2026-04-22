import { useState, useEffect } from 'react';
import brochurePDF from '../../assets/Brochure tejedora - digital.pdf';

const BrochureModal = ({ isOpen, onClose }) => {
    const [formData, setFormData] = useState({
        nombre: '',
        email: '',
        telefono: '',

    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    // Prevent body scroll when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate API call and saving to localStorage
        setTimeout(() => {
            const existingLeads = JSON.parse(localStorage.getItem('brochure_leads') || '[]');
            const newLead = {
                ...formData,
                date: new Date().toISOString(),
                id: Date.now()
            };
            localStorage.setItem('brochure_leads', JSON.stringify([...existingLeads, newLead]));

            setIsSubmitting(false);
            setIsSuccess(true);

            // Trigger download after success
            const link = document.createElement('a');
            link.href = brochurePDF;
            link.download = 'Brochure_Messina.pdf';
            link.click();

            console.log('Lead saved:', newLead);
        }, 1500);
    };

    if (!isOpen && !isSuccess) return null;

    return (
        <div className={`modal-overlay ${isOpen ? 'modal-overlay--active' : ''}`} onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <button className="modal-close" onClick={onClose}>
                    X
                </button>

                {isSuccess ? (
                    <div className="contact-form" style={{ textAlign: 'center', padding: '20px 0' }}>
                        <div style={{ fontSize: '4rem', marginBottom: '20px' }}>✅</div>
                        <h2 className="contact-form__title">¡Gracias por tu interés!</h2>
                        <p className="contact-form__subtitle">
                            La descarga de nuestro brochure debería comenzar automáticamente.
                        </p>
                        <button
                            className="btn btn--primary"
                            onClick={() => {
                                setIsSuccess(false);
                                onClose();
                            }}
                        >
                            Cerrar
                        </button>
                    </div>
                ) : (
                    <form className="contact-form" onSubmit={handleSubmit}>
                        <div className="contact-form__header">
                            <h2 className="contact-form__title">Descargar brochure</h2>
                            <p className="contact-form__subtitle">Completá tus datos y accedé a nuestro brochure completo.</p>
                        </div>

                        <div className="contact-form__group">
                            <label htmlFor="nombre">Nombre y apellido *</label>
                            <input
                                type="text"
                                id="nombre"
                                name="nombre"
                                required
                                value={formData.nombre}
                                onChange={handleChange}
                                placeholder="Ej: Juan Pérez"
                            />
                        </div>

                        <div className="contact-form__group">
                            <label htmlFor="email">Email *</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                required
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="email@ejemplo.com"
                            />
                        </div>

                        <div className="contact-form__group">
                            <label htmlFor="telefono">Teléfono *</label>
                            <input
                                type="tel"
                                id="telefono"
                                name="telefono"
                                required
                                value={formData.telefono}
                                onChange={handleChange}
                                placeholder="Ej: +54 9 11 1234-5678"
                            />
                        </div>



                        <div className="contact-form__actions">
                            <button
                                type="submit"
                                className="btn btn--primary"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? 'Procesando...' : 'Obtener brochure'}
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
};

export default BrochureModal;
