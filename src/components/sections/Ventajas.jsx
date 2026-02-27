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

const Ventajas = () => (
    <section id="ventajas" className="ventajas">
        <div className="ventajas__inner">
            {/* ── Left: image placeholder ── */}
            <div className="ventajas__img-placeholder" aria-label="Imagen ventajas" />

            {/* ── Right: title + advantages list ── */}
            <div className="ventajas__content">
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

export default Ventajas;
