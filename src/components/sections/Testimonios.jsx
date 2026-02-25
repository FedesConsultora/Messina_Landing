const testimoniosList = [
    {
        id: 1,
        texto: '"Trabajamos con Messina hace más de 10 años. Cada vez que necesitamos algo, sabemos que va a estar bien hecho. Lo que más valoramos es que saben lo que hacen."',
        cliente: 'Cliente 1',
    },
    {
        id: 2,
        texto: '"Necesitábamos una pieza específica de tornería que ya no se conseguía. En Messina no solo la fabricaron, sino que mejoraron el diseño original. Se nota el oficio."',
        cliente: 'Cliente 1',
    },
    {
        id: 3,
        texto: '"Excelente relación calidad-precio. Cumplieron con los plazos pactados y el presupuesto fue justo, sin sorpresas. Es difícil encontrar gente tan responsable hoy en día."',
        cliente: 'Cliente 2',
    },
    {
        id: 4,
        texto: '"Contratamos a Messina para una estructura compleja. Cuando la vimos terminada, superó nuestras expectativas en durabilidad y acabado."',
        cliente: 'Cliente 3',
    },
];

const Testimonios = () => (
    <section className="testimonios">
        {/* ── Header centrado ── */}
        <div className="testimonios__header">
            <span className="testimonios__label">Testimonios</span>
            <h2 className="testimonios__title">
                <span className="testimonios__title--orange">Relaciones que<br />perduran</span>{' '}en el tiempo
            </h2>
        </div>

        {/* ── Slider de cards ── */}
        <div className="testimonios__slider">
            {testimoniosList.map((t) => (
                <div key={t.id} className="testimonio-card">
                    <div className="testimonio-card__avatar" aria-label={`Avatar ${t.cliente}`} />
                    <p className="testimonio-card__texto">{t.texto}</p>
                    <span className="testimonio-card__cliente">{t.cliente}</span>
                </div>
            ))}
        </div>
    </section>
);

export default Testimonios;
