import React from 'react';
import { Link } from 'react-router-dom';
import TiendaNavbar from '../../components/layout/TiendaNavbar';

const Carrito = () => {
  // Datos de ejemplo
  const items = [
    { id: 1, nombre: 'Reserva Especial', cantidad: 2, precio: 45000 },
    { id: 2, nombre: 'Origen Único Suave', cantidad: 1, precio: 42000 },
  ];

  const subtotal = items.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);
  const envio = 12000;
  const total = subtotal + envio;

  return (
    <div className="min-h-screen bg-stone-50 font-sans text-gray-900 pb-24">
      <TiendaNavbar />

      <main className="max-w-5xl mx-auto pt-48 px-4 lg:px-0">
        <h1 className="text-3xl font-bold tracking-tight mb-10">Tu Carrito</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Lista de Items */}
          <div className="lg:col-span-2 space-y-8">
            {items.map((item) => (
              <div key={item.id} className="flex gap-6 items-center bg-white p-6 rounded-md shadow-sm border border-gray-100">
                <div className="w-24 h-24 bg-stone-50 rounded-sm flex items-center justify-center flex-shrink-0">
                  <span className="text-xs text-gray-300">Img</span>
                </div>
                <div className="flex-grow">
                  <h3 className="text-lg font-medium">{item.nombre}</h3>
                  <p className="text-gray-500 mt-1">Cantidad: {item.cantidad}</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-semibold">${(item.precio * item.cantidad).toLocaleString()}</p>
                  <button className="text-sm text-gray-400 hover:text-red-500 mt-2 underline">Eliminar</button>
                </div>
              </div>
            ))}
          </div>

          {/* Resumen de Orden */}
          <div className="bg-white p-8 rounded-md shadow-sm border border-gray-100 h-fit">
            <h2 className="text-xl font-semibold mb-6">Resumen del Pedido</h2>
            <div className="space-y-4 text-sm text-gray-600 mb-6">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Envío estimado</span>
                <span>${envio.toLocaleString()}</span>
              </div>
              <div className="border-t border-gray-100 pt-4 mt-4 flex justify-between text-gray-900 text-lg font-medium">
                <span>Total</span>
                <span>${total.toLocaleString()}</span>
              </div>
            </div>
            
            <button className="w-full bg-gray-900 text-white py-4 rounded-md text-base font-medium hover:bg-gray-800 transition-colors shadow-sm">
              Proceder al Pago
            </button>
            <div className="mt-4 text-center">
              <Link to="/tienda/catalogo" className="text-sm text-gray-500 hover:text-gray-900 underline">
                Continuar Comprando
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Carrito;
