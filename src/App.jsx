import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'

// ── Lazy-loaded sections (code splitting por ruta) ─────────────
const Hero = lazy(() => import('./components/sections/Hero'))
const Nosotros = lazy(() => import('./components/sections/Nosotros'))
const Servicios = lazy(() => import('./components/sections/Servicios'))
const Ventajas = lazy(() => import('./components/sections/Ventajas'))
const Proyectos = lazy(() => import('./components/sections/Proyectos'))
const Testimonios = lazy(() => import('./components/sections/Testimonios'))
const Contacto = lazy(() => import('./components/sections/Contacto'))

// ── Loading fallback ───────────────────────────────────────────
const PageLoader = () => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
    <div style={{ width: 36, height: 36, border: '3px solid rgba(255,255,255,0.1)', borderTopColor: '#E07020', borderRadius: '50%', animation: 'spin 0.7s linear infinite' }} />
    <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
  </div>
)

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Hero />} />
            <Route path="/nosotros" element={<Nosotros />} />
            <Route path="/servicios" element={<Servicios />} />
            <Route path="/ventajas" element={<Ventajas />} />
            <Route path="/proyectos" element={<Proyectos />} />
            <Route path="/testimonios" element={<Testimonios />} />
            <Route path="/contacto" element={<Contacto />} />
          </Routes>
        </Suspense>
      </Layout>
    </BrowserRouter>
  )
}

export default App
