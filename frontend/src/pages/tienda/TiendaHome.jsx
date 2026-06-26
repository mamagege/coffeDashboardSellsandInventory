import React from 'react';
import { Link } from 'react-router-dom';
import TiendaNavbar from '../../components/layout/TiendaNavbar';
import AnimatedGallery from '../../components/tienda/AnimatedGallery';

const TiendaHome = () => {

  return (
    <>
      <TiendaNavbar />
      
      {/* Fondo Global Fijo (Resuelve la línea de unión borrosa) */}
      <div className="fixed inset-0 -z-50 pointer-events-none">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/fondo_pantalla.jpg')" }}
        ></div>
        <div className="absolute inset-0 bg-stone-50/60 backdrop-blur-sm"></div>
      </div>

      {/* Nueva Animación de Entrada y Galería Horizontal (Fuera del contenedor para que el z-index de las hojas tape el Navbar) */}
      <AnimatedGallery />

      <div className="relative font-sans text-gray-900 w-full overflow-x-hidden">
        
        {/* Hero Section */}
        <main className="relative flex items-center justify-center text-center px-8 lg:px-24 min-h-[60vh] overflow-hidden">
          
          {/* Taza de Café a la Izquierda con Humo Animado */}
          <div className="absolute inset-y-0 left-0 flex items-center justify-start -z-10 pointer-events-none pl-8 lg:pl-24 hidden lg:flex">
            <div className="relative transform translate-y-16 lg:translate-y-24">
              {/* Taza */}
              <img 
                src="/tazaCafe.png" 
                alt="Taza de Café" 
                className="relative z-10 w-56 lg:w-72 opacity-95 object-contain"
              />
            </div>
          </div>

          {/* Imagen estática, ubicada hacia la derecha (oculta en móviles para evitar cruce) */}
          <div className="absolute inset-y-0 right-0 flex items-center justify-end -z-10 pointer-events-none pr-8 lg:pr-24 hidden lg:flex">
            <img 
              src="/bolsaAmarilla.png" 
              alt="Bolsa Amarilla" 
              className="w-56 lg:w-72 opacity-90 object-contain"
            />
          </div>

          {/* Contenedor de texto centrado */}
          <div className="relative z-10 flex flex-col items-center max-w-xl lg:max-w-2xl">
            <h1 className="text-5xl lg:text-6xl font-bold tracking-tight leading-tight text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-gray-900 drop-shadow-sm">
              El sabor auténtico de las montañas, en tu taza.
            </h1>
            <p className="mt-8 text-lg lg:text-xl text-gray-600 max-w-xl">
              Descubre nuestra selección de cafés de origen único. Cultivados con pasión, tostados a la perfección para brindarte una experiencia inigualable.
            </p>
            
            <div className="mt-12">
              <Link 
                to="/tienda/catalogo" 
                className="bg-gray-900 text-white px-8 py-4 rounded-md text-lg font-medium hover:bg-gray-800 transition-colors duration-300 shadow-sm inline-block"
              >
                Explorar Colección
              </Link>
            </div>
          </div>
        </main>

        {/* Featured Section placeholder */}
        <section className="mt-32 px-8 lg:px-24 pb-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="bg-white aspect-square rounded-md shadow-sm border border-gray-100 flex items-center justify-center">
               <span className="text-gray-300">Imagen de Origen</span>
            </div>
            <div className="space-y-6 max-w-lg">
              <h2 className="text-3xl font-semibold">Cultivado en las Alturas</h2>
              <p className="text-gray-600 leading-relaxed">
                Nuestros granos provienen de fincas seleccionadas ubicadas a más de 1,700 metros sobre el nivel del mar. Esto garantiza una maduración lenta y perfiles de sabor complejos con notas dulces y acidez brillante.
              </p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default TiendaHome;
