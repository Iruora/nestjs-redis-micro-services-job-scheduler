import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import AdminNavigation from '../components/AdminNavigation';

export default function AdminLayout() {
  const navigate = useNavigate();

  useEffect(() => {
    console.log(location.pathname);
    if (location.pathname === '/admin') {
      navigate('/admin/products');
    }
  }, [navigate]);
  return (
    <>
      <AdminNavigation />
      <Outlet />
    </>
  );
}
