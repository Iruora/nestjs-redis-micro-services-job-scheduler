import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminNavigation from '../components/AdminNavigation';

export default function AdminLayout() {
  return (
    <>
      <AdminNavigation />
      <Outlet />
    </>
  );
}
