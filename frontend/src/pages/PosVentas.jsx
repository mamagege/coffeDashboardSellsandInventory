import { useState, useEffect } from 'react';

function PosVentas() {
  const [productos, setProductos] = useState([]);
  const [carrito, setCarrito] = useState([]);
  const [procesando, setProcesando] = useState(false); // Para deshabilitar el botón mientras carga

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/productos`)
      .then(respuesta => respuesta.json())
      .then(datos => setProductos(datos))
      .catch(error => console.error("Error de conexión:", error));
  }, []);

  const clickProducto = (producto) => {
    setCarrito(carritoActual => {
      const itemExistente = carritoActual.find(item => item.idSku === producto.idSku);
      if (itemExistente) {
        return carritoActual.map(item =>
          item.idSku === producto.idSku ? { ...item, cantidad: item.cantidad + 1 } : item
        );
      } else {
        return [...carritoActual, { ...producto, cantidad: 1 }];
      }
    });
  };

  const limpiarCarrito = () => setCarrito([]);

  const calcularTotal = () => {
    return carrito.reduce((total, item) => total + (item.precioVenta * item.cantidad), 0);
  };

  // --- NUEVA LÓGICA: ENVIAR LA VENTA AL BACKEND ---
  const cobrarVenta = async () => {
    setProcesando(true); // Bloqueamos el botón para evitar doble clic

    // 1. Armamos el DTO (El JSON exacto que espera Java)
    const payload = {
      cliente: "Consumidor Final", // A futuro podríamos poner un campo de texto para el nombre
      comentarios: "Venta rápida en caja",
      idVendedor: 1, // Asumimos el vendedor con ID 1 por ahora
      detalles: carrito.map(item => ({
        idSku: item.idSku,
        cantidad: item.cantidad
      }))
    };

    try {
      // 2. Hacemos la petición POST al endpoint de ventas
      const respuesta = await fetch(`${import.meta.env.VITE_API_URL}/ventas`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });

      // 3. Evaluamos la respuesta de Java
      if (respuesta.ok) {
        const mensajeExito = await respuesta.text();
        alert("✅ " + mensajeExito); // Mostramos el mensaje (ej: "Venta procesada con éxito. ID: 1")
        limpiarCarrito(); // Vaciamos la pantalla para el siguiente cliente
      } else {
        const mensajeError = await respuesta.text();
        alert("❌ Error en la base de datos: " + mensajeError);
      }
    } catch (error) {
      console.error("Error de red:", error);
      alert("❌ No se pudo conectar con el servidor.");
    } finally {
      setProcesando(false); // Desbloqueamos el botón
    }
  };

  return (
    <div style={{ display: 'flex', gap: '20px', height: '100%' }}>

      {/* PANEL IZQUIERDO: Catálogo */}
      <div style={{ flex: 2, backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
        <h2 style={{ borderBottom: '2px solid #f3f4f6', paddingBottom: '10px', color: '#1f2937' }}>Seleccionar Productos</h2>
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
          <h2 style={{ margin: 0, color: '#1f2937' }}>Orden Actual</h2>
          {carrito.length > 0 && (
            <button onClick={limpiarCarrito} style={{ backgroundColor: '#ef4444', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '5px', cursor: 'pointer' }}>
              Vaciar
            </button>
          )}
        </div>

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
            onClick={cobrarVenta}
            disabled={carrito.length === 0 || procesando}
            style={{
              width: '100%',
              padding: '15px',
              backgroundColor: (carrito.length === 0 || procesando) ? '#9ca3af' : '#10b981',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '18px',
              fontWeight: 'bold',
              cursor: (carrito.length === 0 || procesando) ? 'not-allowed' : 'pointer',
              transition: 'background-color 0.2s'
            }}
          >
            {procesando ? 'Procesando...' : 'Cobrar e Imprimir'}
          </button>
        </div>
      </div>

    </div>
  );
}

export default PosVentas;