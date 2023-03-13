import React, { lazy } from 'react';
import { Navigate, useRoutes } from "react-router-dom";

const LandingLayout = lazy(() => import('./layouts/LandingLayout'))
const HomePage = lazy(() => import('./pages/HomePage'))
const Login = lazy(() => import('./pages/Login'))

export default function Routes() {
  return useRoutes([
    {
      path: '/',
      element: <LandingLayout />,
      children: [
        {
          path: '',
          element: <HomePage />
        },
        {
          path: 'login',
          element: <Login />
        },
        {
          path: '*',
          element: <Navigate to="/" replace />
        }
      ]
    }
  ]);
}