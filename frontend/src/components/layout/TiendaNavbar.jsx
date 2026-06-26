import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const TiendaNavbar = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      setIsScrolled(currentScrollY > 20);

      // Smart Navbar: esconder al bajar, mostrar al subir
      // Evitamos que se esconda mientras el usuario está viendo la galería animada (los primeros 300vh)
      const galleryHeight = window.innerHeight * 3;
      if (currentScrollY > lastScrollY && currentScrollY > galleryHeight) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // Determinar si el fondo debe ser blanco
  const isWhite = isHovered || isScrolled;

  return (
    <nav 
      className={`fixed top-0 w-full z-50 flex flex-col items-center justify-center transition-all duration-300 py-6 ${
        isWhite ? 'bg-white shadow-sm' : 'bg-transparent'
      } ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Título principal centrado */}
      <div className="text-3xl font-semibold tracking-tighter mb-4 text-gray-900">
        <Link to="/tienda">Café de Especialidad</Link>
      </div>
      
      {/* Links abajo del título */}
      <div className="flex items-center space-x-8 text-sm font-medium text-gray-900">
        <Link to="/tienda/catalogo" className="hover:text-gray-500 transition-colors uppercase tracking-widest">Catálogo</Link>
        <Link to="/tienda/carrito" className="hover:text-gray-500 transition-colors uppercase tracking-widest">Carrito</Link>
        <Link to="/dashboard" className="bg-gray-900 text-white px-4 py-1.5 rounded-md hover:bg-gray-800 transition-colors uppercase tracking-widest text-xs shadow-sm">Admin</Link>
      </div>
    </nav>
  );
};

export default TiendaNavbar;
