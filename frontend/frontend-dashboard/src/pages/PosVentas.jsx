import { useState, useEffect } from 'react';

function PosVentas() {
  const [productos, setProductos] = useState([]);
  const [carrito, setCarrito] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/api/v1/productos')
      .then(respuesta => respuesta.json())
      .then(datos => setProductos(datos))
      .catch(error => console.error("Error de conexión:", error));
  }, []);

  // --- NUEVA LÓGICA DEL CARRITO ---
  const clickProducto = (producto) => {
    setCarrito(carritoActual => {
      // 1. Buscamos si el producto ya fue agregado antes
      const itemExistente = carritoActual.find(item => item.idSku === producto.idSku);

      if (itemExistente) {
        // 2. Si ya existe, creamos un nuevo arreglo actualizando solo la cantidad de ese item
        return carritoActual.map(item =>
          item.idSku === producto.idSku
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        );
      } else {
        // 3. Si no existe, lo agregamos al final con cantidad inicial de 1
        return [...carritoActual, { ...producto, cantidad: 1 }];
      }
    });
  };

  // Función para vaciar la orden (útil si el cliente se arrepiente)
  const limpiarCarrito = () => setCarrito([]);

  // Calculadora del gran total
  const calcularTotal = () => {
    return carrito.reduce((total, item) => total + (item.precioVenta * item.cantidad), 0);
  };

  return (
    <div style={{ display: 'flex', gap: '20px', height: '100%' }}>

      {/* PANEL IZQUIERDO: Catálogo */}
      <div style={{ flex: 2, backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
        <h2 style={{ borderBottom: '2px solid #f3f4f6', paddingBottom: '10px' }}>Seleccionar Productos</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '15px', marginTop: '20px' }}>
          {productos.length === 0 ? (
            <p>Cargando productos...</p>
          ) : (
            productos.map((prod) => (
              <button
                key={prod.idSku}
                onClick={() => clickProducto(prod)}
                style={{
                  padding: '20px',
                  backgroundColor: prod.tipoItem === 'CAFE' ? '#78350f' : '#d97706',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  transition: 'transform 0.1s'
                }}
                onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.95)'}
                onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
              >
                <span style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '10px', textAlign: 'center' }}>
                  {prod.nombreDisplay}
                </span>
                <span style={{ fontSize: '18px' }}>
                  ${prod.precioVenta.toLocaleString('es-CO')}
                </span>
              </button>
            ))
          )}
        </div>
      </div>

      {/* PANEL DERECHO: Carrito de Compras */}
      <div style={{ flex: 1, backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid #f3f4f6', paddingBottom: '10px' }}>
          <h2 style={{ margin: 0 }}>Orden Actual</h2>
          {carrito.length > 0 && (
            <button onClick={limpiarCarrito} style={{ backgroundColor: '#ef4444', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '5px', cursor: 'pointer' }}>
              Vaciar
            </button>
          )}
        </div>

        {/* Lista dinámica de items */}
        <div style={{ flexGrow: 1, marginTop: '20px', overflowY: 'auto' }}>
          {carrito.length === 0 ? (
            <p style={{ color: '#6b7280', textAlign: 'center' }}>El carrito está vacío</p>
          ) : (
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {carrito.map((item, index) => (
                <li key={index} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px', borderBottom: '1px dashed #e5e7eb', paddingBottom: '10px' }}>
                  <div>
                    <span style={{ fontWeight: 'bold', display: 'block' }}>{item.nombreDisplay}</span>
                    <span style={{ fontSize: '14px', color: '#6b7280' }}>
                      {item.cantidad} x ${item.precioVenta.toLocaleString('es-CO')}
                    </span>
                  </div>
                  <div style={{ fontWeight: 'bold', fontSize: '16px', alignSelf: 'flex-end' }}>
                    ${(item.cantidad * item.precioVenta).toLocaleString('es-CO')}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Totales y Botón de Cobro */}
        <div style={{ borderTop: '2px solid #f3f4f6', paddingTop: '20px', marginTop: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>
            <span>Total:</span>
            <span>${calcularTotal().toLocaleString('es-CO')}</span>
          </div>
          <button
            disabled={carrito.length === 0}
            style={{
              width: '100%',
              padding: '15px',
              backgroundColor: carrito.length === 0 ? '#9ca3af' : '#10b981',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '18px',
              fontWeight: 'bold',
              cursor: carrito.length === 0 ? 'not-allowed' : 'pointer',
              transition: 'background-color 0.2s'
            }}
          >
            Cobrar e Imprimir
          </button>
        </div>
      </div>

    </div>
  );
}

export default PosVentas;