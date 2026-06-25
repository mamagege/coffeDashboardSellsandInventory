import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import PosVentas from './pages/PosVentas';
import DashboardGerencia from './pages/DashboardGerencia';
import Inventario from './pages/Inventario';
import Sidebar from './components/layout/Sidebar';

function App() {
  return (
    <BrowserRouter>
      {/* Contenedor principal usando Flexbox para poner el menú al lado del contenido */}
      <div style={{ display: 'flex', minHeight: '100vh', fontFamily: 'sans-serif' }}>
        
        {/* El menú lateral siempre estará visible */}
        <Sidebar />

        {/* El área principal donde cambia el contenido según la ruta */}
        <main style={{ flexGrow: 1, padding: '20px', backgroundColor: '#f3f4f6' }}>
          <Routes>
            <Route path="/" element={<PosVentas />} />
            <Route path="/dashboard" element={<DashboardGerencia />} />
            <Route path="/inventario" element={<Inventario />} />
          </Routes>
        </main>
        
      </div>
    </BrowserRouter>
  );
}

export default App;