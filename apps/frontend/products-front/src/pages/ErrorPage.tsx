import React from 'react';
import { useRouteError } from 'react-router-dom';
import MainNavigation from '../components/MainNavigation';

export default function Errorpage() {
  const error = useRouteError();
  console.log(error);

  return (
    <div>
      <MainNavigation />
      Message: {(error as any).message}
    </div>
  );
}
