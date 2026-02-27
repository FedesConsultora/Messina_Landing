const Nosotros = () => (
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
                    evolucionando desde la herrería tradicional hacia soluciones industriales complejas.
                </p>
                <p className="nosotros__body">
                    Nos define un espíritu de personas capaces, dispuestas a resolver cada situación
                    con oficio y seriedad. En Messina, diseñamos con hierro, pero construimos
                    confianza.
                </p>
            </div>
        </div>

        {/* ── Bottom: two image placeholders ── */}
        <div className="nosotros__images">
            <div className="nosotros__img-placeholder" aria-label="Imagen 1" />
            <div className="nosotros__img-placeholder" aria-label="Imagen 2" />
        </div>
    </section>
);

export default Nosotros;
