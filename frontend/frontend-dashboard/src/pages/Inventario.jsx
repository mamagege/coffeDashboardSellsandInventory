import { useState, useEffect } from 'react';

function Inventario() {
    const [inventario, setInventario] = useState([]);
    const [cargando, setCargando] = useState(true);

    // Función para traer los datos del backend
    const cargarInventario = () => {
        setCargando(true);
        fetch('http://localhost:8080/api/v1/inventario')
            .then(respuesta => respuesta.json())
            .then(datos => {
                setInventario(datos);
                setCargando(false);
            })
            .catch(error => {
                console.error("Error cargando inventario:", error);
                setCargando(false);
            });
    };

    // Se ejecuta al cargar la pantalla por primera vez
    useEffect(() => {
        cargarInventario();
    }, []);

    return (
        <div style={{ padding: '20px', backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', height: '100%' }}>

            {/* ENCABEZADO REFACTORIZADO: Menos padding y título más pequeño */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid #f3f4f6', paddingBottom: '10px', marginBottom: '15px' }}>
                <h2 style={{ margin: 0, color: '#1f2937', fontSize: '22px' }}>📦 Control de Inventario (Materia Prima)</h2>
                <button
                    onClick={cargarInventario}
                    style={{ padding: '8px 15px', backgroundColor: '#3b82f6', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold', fontSize: '14px' }}
                >
                    🔄 Actualizar Datos
                </button>
            </div>

            {cargando ? (
                <p style={{ textAlign: 'center', color: '#6b7280', fontSize: '18px' }}>Cargando existencias...</p>
            ) : (
                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                        <thead>
                        <tr style={{ backgroundColor: '#f9fafb', borderBottom: '2px solid #e5e7eb' }}>
                            <th style={{ padding: '15px', color: '#374151' }}>ID Bodega</th>
                            <th style={{ padding: '15px', color: '#374151' }}>Origen / Sabor</th>
                            <th style={{ padding: '15px', color: '#374151' }}>Presentación Física</th>
                            <th style={{ padding: '15px', color: '#374151' }}>Existencias (Kg)</th>
                            <th style={{ padding: '15px', color: '#374151' }}>Estado</th>
                        </tr>
                        </thead>
                        <tbody>
                        {inventario.map((item) => (
                            <tr key={item.idInventarioMateria} style={{ borderBottom: '1px solid #e5e7eb', transition: 'background-color 0.2s' }}>
                                <td style={{ padding: '15px', fontWeight: 'bold', color: '#6b7280' }}>#{item.idInventarioMateria}</td>
                                <td style={{ padding: '15px', fontSize: '16px' }}>{item.origenSabor}</td>
                                <td style={{ padding: '15px' }}>
                    <span style={{
                        padding: '5px 10px',
                        borderRadius: '15px',
                        fontSize: '14px',
                        backgroundColor: item.esMolido ? '#fef3c7' : '#d1fae5',
                        color: item.esMolido ? '#92400e' : '#065f46'
                    }}>
                      {item.esMolido ? 'Polvo (Molido)' : 'En Grano'}
                    </span>
                                </td>
                                <td style={{ padding: '15px', fontSize: '18px', fontWeight: 'bold', color: item.cantidadKg < 10 ? '#ef4444' : '#1f2937' }}>
                                    {item.cantidadKg.toFixed(2)} kg
                                </td>
                                <td style={{ padding: '15px' }}>
                                    {item.cantidadKg < 10
                                        ? <span style={{ color: '#ef4444', fontWeight: 'bold' }}>⚠️ Stock Bajo</span>
                                        : <span style={{ color: '#10b981', fontWeight: 'bold' }}>✅ Óptimo</span>
                                    }
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            )}

        </div>
    );
}

export default Inventario;