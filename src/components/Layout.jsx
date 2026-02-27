import Navbar from './Navbar';

// ── Icon helper ─────────────────────────────────────────────────
const CircleCheck = () => (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="7" cy="7" r="6.5" stroke="white" strokeOpacity="0.7" />
        <path d="M4 7l2 2 4-4" stroke="white" strokeOpacity="0.9" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const Layout = ({ children }) => {
    return (
        <div className="layout-container">

            {/* ── Top Info Bar ─────────────────────────────── */}
            <div className="topbar">
                <div className="topbar__inner">
                    <span className="topbar__item"><CircleCheck /> 8:00 a 15:00 hrs</span>
                    <span className="topbar__item"><CircleCheck />+54 9 2345 68‑9621</span>
                    <span className="topbar__item"><CircleCheck /> Dirección</span>
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
