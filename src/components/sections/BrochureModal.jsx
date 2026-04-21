import { useState, useEffect } from 'react';

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

            // Trigger download after success (using a dummy PDF link)
            const link = document.createElement('a');
            link.href = '#'; // In a real app, this would be the actual PDF path
            link.download = 'Messina_Brochure.pdf';
            // link.click(); // Commented out to avoid actually downloading in this environment

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
                            La descarga de nuestro catálogo debería comenzar automáticamente.
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
                            <h2 className="contact-form__title">Descargar catálogo</h2>
                            <p className="contact-form__subtitle">Completá tus datos y accedé a nuestro catálogo completo.</p>
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



                        <button
                            type="submit"
                            className="btn btn--primary"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Procesando...' : 'Obtener catálogo'}
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default BrochureModal;
