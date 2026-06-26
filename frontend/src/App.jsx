import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import PosVentas from './pages/PosVentas';
import DashboardGerencia from './pages/DashboardGerencia';
import Inventario from './pages/Inventario';
import AdminLayout from './components/layout/AdminLayout';
import TiendaHome from './pages/tienda/TiendaHome';
import Catalogo from './pages/tienda/Catalogo';
import Carrito from './pages/tienda/Carrito';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rutas Administrativas con Sidebar */}
        <Route element={<AdminLayout />}>
          <Route path="/" element={<PosVentas />} />
          <Route path="/dashboard" element={<DashboardGerencia />} />
          <Route path="/inventario" element={<Inventario />} />
        </Route>

        {/* Rutas Públicas (Tienda E-commerce) - Sin Sidebar */}
        <Route path="/tienda" element={<TiendaHome />} />
        <Route path="/tienda/catalogo" element={<Catalogo />} />
        <Route path="/tienda/carrito" element={<Carrito />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;