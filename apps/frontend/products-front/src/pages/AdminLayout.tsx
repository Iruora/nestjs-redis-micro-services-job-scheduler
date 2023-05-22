import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import AdminNavigation from '../components/AdminNavigation';

export default function AdminLayout() {
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === '/admin') {
      navigate('/admin/products');
    }
  }, []);

  return (
    <>
      <AdminNavigation />
      <Outlet />
    </>
  );
}
