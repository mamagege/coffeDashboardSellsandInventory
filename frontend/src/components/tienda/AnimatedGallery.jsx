import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';

const productosMock = [
  { id: 1, nombre: "Origen Quindío", tipo: "Lavado", notas: "Chocolate, Caramelo", precio: "$35.000", imagen: "/bolsaAmarilla.png" },
  { id: 2, nombre: "Reserva Especial", tipo: "Honey", notas: "Frutos rojos, Panela", precio: "$42.000", imagen: "/bolsaAmarilla.png" },
  { id: 3, nombre: "Edición Limitada", tipo: "Natural", notas: "Vino tinto, Cacao", precio: "$55.000", imagen: "/bolsaAmarilla.png" },
  { id: 4, nombre: "Montaña Mágica", tipo: "Lavado", notas: "Limón, Miel", precio: "$38.000", imagen: "/bolsaAmarilla.png" },
  { id: 5, nombre: "Brisa Cafetera", tipo: "Natural", notas: "Mora, Chocolate blanco", precio: "$48.000", imagen: "/bolsaAmarilla.png" },
];

const AnimatedGallery = () => {
  const targetRef = useRef(null);
  const navigate = useNavigate();
  
  // Hook de Framer Motion para detectar el progreso del scroll en este componente
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  // Animaciones de las hojas (se abren del 0% al 30% del scroll)
  const leftLeafX = useTransform(scrollYProgress, [0, 0.3], ["0%", "-100%"]);
  const rightLeafX = useTransform(scrollYProgress, [0, 0.3], ["0%", "100%"]);
  
  // Animación del texto central (desaparece del 0% al 20% del scroll)
  const textOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0], { clamp: true });
  const textDisplay = useTransform(scrollYProgress, p => p > 0.22 ? "none" : "flex");

  // Animación de la galería (comienza a moverse del 30% al 100%)
  const galleryX = useTransform(scrollYProgress, [0.3, 1], ["0%", "-60%"]);

  const containerVisibility = useTransform(scrollYProgress, p => p > 0.35 ? "hidden" : "visible");

  return (
    <section 
      ref={targetRef} 
      className="relative h-[300vh] bg-cover bg-center bg-no-repeat bg-fixed"
      style={{ backgroundImage: "url('/fondo_pantalla.jpg')" }}
    >
      {/* Overlay idéntico al del resto de la página */}
      <div className="absolute inset-0 bg-stone-50/60 backdrop-blur-sm pointer-events-none z-0"></div>

      <div className="sticky top-0 h-screen flex items-center overflow-hidden z-10">
        
        {/* Título de fondo de la Galería */}
        <div className="absolute top-32 left-12 md:left-24 z-0">
          <h2 className="text-6xl font-bold text-gray-800/20 uppercase tracking-tighter">Colección Especial</h2>
        </div>

        {/* Galería Horizontal Oculta Detrás */}
        <motion.div 
          style={{ x: galleryX }} 
          className="relative z-10 flex gap-8 px-12 md:px-24 w-[250vw] md:w-[150vw]"
        >
          {productosMock.map((prod) => {
            // Asignar 2 esquinas aleatorias (determinista basado en el ID) para las flores
            const cornerPairs = [
              ['top-left', 'bottom-right'],
              ['top-right', 'bottom-left'],
              ['top-left', 'bottom-left'],
              ['top-right', 'bottom-right'],
              ['bottom-left', 'bottom-right']
            ];
            const myCorners = cornerPairs[prod.id % cornerPairs.length];

            const cornerClasses = {
              'top-left': 'top-[-15px] left-[-15px] rotate-[-90deg] group-hover:rotate-[-45deg]',
              'top-right': 'top-[-15px] right-[-15px] rotate-[0deg] group-hover:rotate-[45deg]',
              'bottom-left': 'bottom-[-15px] left-[-15px] rotate-[180deg] group-hover:rotate-[225deg]',
              'bottom-right': 'bottom-[-15px] right-[-15px] rotate-[90deg] group-hover:rotate-[135deg]'
            };

            return (
              <div 
                key={prod.id} 
                onClick={() => navigate('/tienda/catalogo')}
                className="relative group min-w-[300px] md:min-w-[400px] bg-white rounded-xl shadow-sm border border-gray-100 p-8 flex flex-col items-center flex-shrink-0 transition-all duration-300 transform-gpu hover:scale-105 hover:shadow-2xl hover:border-transparent overflow-hidden cursor-pointer"
              >
                {/* Marco de Flores Aleatorio (Máximo 2, siempre en z-0 por debajo del contenido) */}
                {myCorners.map((corner) => (
                  <img 
                    key={corner}
                    src="/flor.png" 
                    className={`absolute w-28 h-28 object-contain opacity-0 group-hover:opacity-100 transition-all duration-500 transform z-0 ${cornerClasses[corner]}`} 
                    alt="" 
                  />
                ))}

                {/* Contenedor del contenido con z-10 para asegurar que las flores no tapen nada */}
                <div className="relative z-10 flex flex-col items-center w-full">
                  {/* Imagen del Producto (Zoom en hover) */}
                  <img src={prod.imagen} alt={prod.nombre} className="w-48 h-48 object-contain mb-6 drop-shadow-sm transition-transform duration-500 group-hover:scale-110" />
                  
                  <div className="text-center w-full">
                    <span className="text-xs font-bold text-red-500 uppercase tracking-wider">{prod.tipo}</span>
                    <h3 className="text-2xl font-bold mt-2 text-gray-900">{prod.nombre}</h3>
                    <p className="text-gray-500 mt-2 text-sm">{prod.notas}</p>
                    <div className="flex justify-center items-center mt-6 pt-6 border-t border-gray-50 w-full">
                      <span className="text-2xl font-extrabold text-gray-900 tracking-tight">{prod.precio}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </motion.div>

        </div>

      {/* Hojas y Texto Superpuestos (Entrada Inmersiva) - Fixed z-[60] para tapar header */}
      <motion.div 
        style={{ visibility: containerVisibility }}
        className="fixed inset-0 pointer-events-none flex items-center justify-center overflow-hidden z-[60]"
      >
          
          {/* Hojas Traseras (Capa secundaria para dar más volumen y tapar más) */}
          <motion.img 
            src="/hojaVerdeIzquierda.png" 
            style={{ x: leftLeafX }} 
            className="absolute left-[-10%] bottom-[-10%] w-3/4 h-3/4 object-cover origin-bottom-left rotate-12 opacity-90 brightness-75 blur-[2px]"
            alt=""
          />
          
          <motion.img 
            src="/hojaVerdeDerecha.png" 
            style={{ x: rightLeafX }} 
            className="absolute right-[-10%] bottom-[-10%] w-3/4 h-3/4 object-cover origin-bottom-right -rotate-12 opacity-90 brightness-75 blur-[2px]"
            alt=""
          />

          {/* Hojas Principales */}
          <motion.img 
            src="/hojaVerdeIzquierda.png" 
            style={{ x: leftLeafX }} 
            className="absolute left-0 top-0 w-1/2 h-full object-cover origin-left"
            alt="Hoja Verde Izquierda"
          />
          
          <motion.img 
            src="/hojaVerdeDerecha.png" 
            style={{ x: rightLeafX }} 
            className="absolute right-0 top-0 w-1/2 h-full object-cover origin-right"
            alt="Hoja Verde Derecha"
          />
          
          <motion.div 
            style={{ opacity: textOpacity, display: textDisplay }}
            className="absolute z-30 flex-col items-center bg-white/60 backdrop-blur-md px-12 py-12 rounded-3xl shadow-2xl text-center border border-white/50"
          >
            <span className="text-sm font-bold text-red-600 uppercase tracking-widest mb-4">La esencia pura</span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight max-w-lg">
              Baja para descubrir la sorpresa
            </h2>
            <div className="mt-8 animate-bounce">
              <svg className="w-10 h-10 text-gray-900 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
          </motion.div>
        </motion.div>
    </section>
  );
};

export default AnimatedGallery;
