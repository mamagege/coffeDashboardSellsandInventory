import { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

function DashboardGerencia() {
    const [metricas, setMetricas] = useState({
        ingresosTotales: 0,
        totalTransacciones: 0,
        topProductos: []
    });
    const [cargando, setCargando] = useState(true);

    const cargarDashboard = () => {
        setCargando(true);
        fetch('http://localhost:8080/api/v1/dashboard/resumen')
            .then(res => res.json())
            .then(datos => {
                setMetricas(datos);
                setCargando(false);
            })
            .catch(error => console.error("Error cargando dashboard:", error));
    };

    useEffect(() => {
        cargarDashboard();
    }, []);

    return (
        <div style={{ padding: '20px', height: '100%' }}>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h2 style={{ margin: 0, color: '#1f2937', fontSize: '24px' }}>📊 Análisis de Rendimiento</h2>
                <button
                    onClick={cargarDashboard}
                    style={{ padding: '8px 15px', backgroundColor: '#3b82f6', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}
                >
                    🔄 Refrescar Métricas
                </button>
            </div>

            {cargando ? (
                <p>Cargando analíticas...</p>
            ) : (
                <>
                    {/* SECCIÓN 1: Tarjetas de KPIs (Criterios de Rendimiento) */}
                    <div style={{ display: 'flex', gap: '20px', marginBottom: '30px' }}>

                        {/* Tarjeta de Ingresos */}
                        <div style={{ flex: 1, backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', borderLeft: '5px solid #10b981' }}>
                            <h3 style={{ margin: '0 0 10px 0', color: '#6b7280', fontSize: '16px' }}>Ingresos Brutos</h3>
                            <p style={{ margin: 0, fontSize: '32px', fontWeight: 'bold', color: '#1f2937' }}>
                                ${metricas.ingresosTotales.toLocaleString('es-CO')}
                            </p>
                        </div>

                        {/* Tarjeta de Transacciones */}
                        <div style={{ flex: 1, backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', borderLeft: '5px solid #3b82f6' }}>
                            <h3 style={{ margin: '0 0 10px 0', color: '#6b7280', fontSize: '16px' }}>Transacciones Completadas</h3>
                            <p style={{ margin: 0, fontSize: '32px', fontWeight: 'bold', color: '#1f2937' }}>
                                {metricas.totalTransacciones} Ventas
                            </p>
                        </div>

                        {/* Tarjeta de Ticket Promedio (Calculado al vuelo en React) */}
                        <div style={{ flex: 1, backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', borderLeft: '5px solid #f59e0b' }}>
                            <h3 style={{ margin: '0 0 10px 0', color: '#6b7280', fontSize: '16px' }}>Ticket Promedio</h3>
                            <p style={{ margin: 0, fontSize: '32px', fontWeight: 'bold', color: '#1f2937' }}>
                                ${metricas.totalTransacciones > 0
                                ? Math.round(metricas.ingresosTotales / metricas.totalTransacciones).toLocaleString('es-CO')
                                : 0}
                            </p>
                        </div>

                    </div>

                    {/* SECCIÓN 2: Gráfico de Rendimiento por Producto */}
                    <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', height: '400px' }}>
                        <h3 style={{ margin: '0 0 20px 0', color: '#374151' }}>🏆 Top Productos (Unidades Vendidas)</h3>

                        {metricas.topProductos.length === 0 ? (
                            <p style={{ textAlign: 'center', color: '#9ca3af', marginTop: '50px' }}>No hay datos de ventas para graficar aún.</p>
                        ) : (
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={metricas.topProductos} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                    <XAxis dataKey="nombre" stroke="#6b7280" />
                                    <YAxis allowDecimals={false} stroke="#6b7280" />
                                    <Tooltip cursor={{fill: '#f3f4f6'}} />
                                    <Bar dataKey="cantidad" fill="#8b5cf6" radius={[4, 4, 0, 0]} name="Unidades" />
                                </BarChart>
                            </ResponsiveContainer>
                        )}
                    </div>
                </>
            )}
        </div>
    );
}

export default DashboardGerencia;