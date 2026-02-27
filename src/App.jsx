import { lazy, Suspense } from 'react'
import { BrowserRouter } from 'react-router-dom'
import Layout from './components/Layout'

// ── Lazy-loaded sections (code splitting) ─────────────────────
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
          <Hero />
          <Nosotros />
          <Servicios />
          <Ventajas />
          <Proyectos />
          <Testimonios />
          <Contacto />
        </Suspense>
      </Layout>
    </BrowserRouter>
  )
}

export default App
