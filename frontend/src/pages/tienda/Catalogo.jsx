import React from 'react';
import { Link } from 'react-router-dom';
import TiendaNavbar from '../../components/layout/TiendaNavbar';

const Catalogo = () => {
  // Datos de ejemplo
  const productos = [
    { id: 1, nombre: 'Reserva Especial', origen: 'Finca La Nube', notas: 'Chocolate, Caramelo, Frutos Rojos', precio: 45000 },
    { id: 2, nombre: 'Origen Único Suave', origen: 'Finca El Sol', notas: 'Jazmín, Miel, Limón', precio: 42000 },
    { id: 3, nombre: 'Tueste Oscuro Intenso', origen: 'Variedad de Fincas', notas: 'Cacao Oscuro, Nuez, Especias', precio: 38000 },
    { id: 4, nombre: 'Edición Limitada Geisha', origen: 'Finca Paraíso', notas: 'Flores Blancas, Durazno, Bergamota', precio: 85000 },
  ];

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 pb-24">
      <TiendaNavbar />

      <main className="px-8 lg:px-24 pt-48">
        <header className="mb-16">
          <h1 className="text-4xl font-bold tracking-tight">Nuestro Catálogo</h1>
          <p className="mt-4 text-gray-600 max-w-2xl">Explora nuestros perfiles de tueste y encuentra tu café ideal.</p>
        </header>

        {/* Grid de Productos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          {productos.map((producto) => (
            <div key={producto.id} className="group cursor-pointer">
              <div className="bg-stone-50 aspect-[4/5] rounded-md mb-6 flex items-center justify-center group-hover:bg-stone-100 transition-colors duration-300">
                <span className="text-gray-300">Imagen de Producto</span>
              </div>
              <h3 className="text-xl font-semibold">{producto.nombre}</h3>
              <p className="text-sm text-gray-500 mt-1">{producto.origen}</p>
              <p className="text-sm text-gray-600 mt-3 italic">{producto.notas}</p>
              <div className="mt-4 flex justify-between items-center">
                <span className="font-medium text-lg">${producto.precio.toLocaleString()}</span>
                <button className="bg-transparent border border-gray-900 text-gray-900 px-4 py-2 rounded-md text-sm hover:bg-gray-900 hover:text-white transition-colors duration-300">
                  Agregar
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Catalogo;
