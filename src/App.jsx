import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import { Home, Servicios, Proyectos, Testimonios, Contacto } from './pages/Sections'

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/servicios" element={<Servicios />} />
          <Route path="/proyectos" element={<Proyectos />} />
          <Route path="/testimonios" element={<Testimonios />} />
          <Route path="/contacto" element={<Contacto />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

export default App
