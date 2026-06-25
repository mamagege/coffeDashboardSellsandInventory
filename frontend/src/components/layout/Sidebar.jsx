import { Link } from 'react-router-dom';

function Sidebar() {
  return (
    <nav style={{ width: '250px', backgroundColor: '#1f2937', color: 'white', padding: '20px' }}>
      <h2 style={{ color: '#fbbf24', marginBottom: '30px' }}>☕ Café ERP</h2>
      
      <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <li>
          {/* Usamos Link en lugar de <a> para no recargar la página */}
          <Link to="/" style={{ color: 'white', textDecoration: 'none', fontSize: '18px' }}>
            🛒 Punto de Venta
          </Link>
        </li>
        <li>
          <Link to="/dashboard" style={{ color: 'white', textDecoration: 'none', fontSize: '18px' }}>
            📊 Dashboard
          </Link>
        </li>
        <li>
          <Link to="/inventario" style={{ color: 'white', textDecoration: 'none', fontSize: '18px' }}>
            📦 Inventario
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Sidebar;