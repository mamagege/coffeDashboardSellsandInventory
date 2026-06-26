import React from 'react';
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';

const AdminLayout = () => {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: 'sans-serif' }}>
      <Sidebar />
      <main style={{ flexGrow: 1, padding: '20px', backgroundColor: '#f3f4f6' }}>
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
