// src/routes/ProtectedRoute.jsx
import { Navigate, useLocation } from 'react-router-dom';

export const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('token'); // Replace with your auth check
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  return children;
};

// src/routes/routes.js
import { lazy } from 'react';

// Lazy load components for better performance
const Dashboard = lazy(() => import('../pages/Dashboard'));
const FinanceBallots = lazy(() => import('../pages/Finance/Ballots'));
const FinanceAGM = lazy(() => import('../pages/Finance/AGM'));
const Notices = lazy(() => import('../pages/Community/Notices'));
const HelpDesk = lazy(() => import('../pages/Community/HelpDesk'));
// ... import other components

export const routes = {
  public: [
    {
      path: '/login',
      element: lazy(() => import('../pages/Login')),
    },
    {
      path: '/register',
      element: lazy(() => import('../pages/Register')),
    },
    {
      path: '*',
      element: lazy(() => import('../pages/NotFound')),
    },
  ],
  protected: [
    {
      path: '/dashboard',
      element: Dashboard,
    },
    {
      path: '/finance',
      children: [
        {
          path: 'ballots',
          element: FinanceBallots,
        },
        {
          path: 'agm',
          element: FinanceAGM,
        },
      ],
    },
    {
      path: '/community',
      children: [
        {
          path: 'notices',
          element: Notices,
        },
        {
          path: 'help-desk',
          element: HelpDesk,
        },
        // ... other community routes
      ],
    },
    // ... other protected routes
  ],
};

// src/App.jsx
import { Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { routes } from './routes/routes';
import { ProtectedRoute } from './routes/ProtectedRoute';
import Sidebar from './components/Sidebar';
import LoadingSpinner from './components/LoadingSpinner';
import Layout from './components/Layout';

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          {/* Public Routes */}
          {routes.public.map(({ path, element: Element }) => (
            <Route
              key={path}
              path={path}
              element={
                <Suspense fallback={<LoadingSpinner />}>
                  <Element />
                </Suspense>
              }
            />
          ))}

          {/* Protected Routes */}
          <Route element={<Layout />}>
            {routes.protected.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={
                  <ProtectedRoute>
                    <Suspense fallback={<LoadingSpinner />}>
                      <route.element />
                    </Suspense>
                  </ProtectedRoute>
                }
              >
                {route.children?.map((child) => (
                  <Route
                    key={child.path}
                    path={child.path}
                    element={
                      <Suspense fallback={<LoadingSpinner />}>
                        <child.element />
                      </Suspense>
                    }
                  />
                ))}
              </Route>
            ))}
          </Route>

          {/* Default redirect */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}