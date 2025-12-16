import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import LoadingScreen from "./components/LoadingScreen";
import ScrollToTop from "./components/ScrollToTop";
import Home from "./pages/Home";
import Servicios from "./pages/Servicios";
import ServicioDetalle from "./pages/ServicioDetalle";
import Portfolio from "./pages/Portfolio";
import About from "./pages/About";
import Contacto from "./pages/Contacto";

function AppContent() {
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Mostrar cortina al cambiar de página
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800); // 0.8 segundos de cortina entre páginas

    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <>
      <ScrollToTop />
      <AnimatePresence mode='wait'>
        {loading ? (
          <LoadingScreen key='loading' />
        ) : (
          <div className='app' key={location.pathname}>
            <Navbar />
            <main className='main-content'>
              <Routes location={location}>
                <Route path='/' element={<Home />} />
                <Route path='/servicios' element={<Servicios />} />
                <Route path='/servicios/:id' element={<ServicioDetalle />} />
                <Route path='/portfolio' element={<Portfolio />} />
                <Route path='/nosotros' element={<About />} />
                <Route path='/contacto' element={<Contacto />} />
              </Routes>
            </main>
            <Footer />
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

function App() {
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    // Carga inicial de la aplicación
    const timer = setTimeout(() => {
      setInitialLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (initialLoading) {
    return <LoadingScreen />;
  }

  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
