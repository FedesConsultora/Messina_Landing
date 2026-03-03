import Navbar from './Navbar';

// ── Icon helper ─────────────────────────────────────────────────
const CircleCheck = () => (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="7" cy="7" r="6.5" stroke="white" strokeOpacity="0.7" />
        <path d="M4 7l2 2 4-4" stroke="white" strokeOpacity="0.9" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const WhatsAppIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
        <path d="M12 0C5.373 0 0 5.373 0 12c0 2.125.558 4.126 1.535 5.86L.057 23.272a.75.75 0 0 0 .92.92l5.42-1.476A11.95 11.95 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.91 0-3.704-.527-5.232-1.443l-.374-.223-3.872 1.054 1.055-3.872-.223-.374A9.955 9.955 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
    </svg>
);

const Layout = ({ children }) => {
    return (
        <div className="layout-container">

            {/* ── Top Info Bar ─────────────────────────────── */}
            <div className="topbar">
                <div className="topbar__inner">
                    <span className="topbar__item"><CircleCheck /> 8:00 a 15:00 h</span>
                    <a href="https://wa.me/5492345689621?text=Hola%2C%20me%20gustar%C3%ADa%20recibir%20m%C3%A1s%20informaci%C3%B3n" target="_blank" rel="noopener noreferrer" className="topbar__item topbar__item--link">
                        <WhatsAppIcon />+54 9 2345 68‑9621
                    </a>
                    <span className="topbar__item">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                            <circle cx="12" cy="10" r="3" />
                        </svg>
                        Dirección
                    </span>
                </div>
            </div>

            {/* ── Navbar (separate component) ─────────────── */}
            <Navbar />

            {/* ── Page Content ─────────────────────────────── */}
            <main className="main-content">
                {children}
            </main>

        </div>
    );
};

export default Layout;
