import React, { lazy, Suspense } from 'react';
import { useRoutes } from 'react-router-dom';
// import { useCurrentTimezone } from '../context/currentTimezoneContext';

// 通用懒加载包装
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function lazyLoad(importFn: () => Promise<{ default: React.ComponentType<any> }>): React.ReactNode {
  const Component = lazy(importFn);
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Component />
    </Suspense>
  );
}

const routes = [
  {
    path: '/',
    element: lazyLoad(() => import('../pages/Home')),
  },
  {
    path: '/about',
    element: lazyLoad(() => import('../pages/About')),
  },
  {
    path: '/dashboard',
    element: lazyLoad(() => import('../pages/Dashboard')),
    children: [
      {
        path: 'profile',
        element: lazyLoad(() => import('../pages/Profile')),
      },
      {
        path: 'settings',
        element: lazyLoad(() => import('../pages/Settings')),
      },
    ],
  },
];

const AppRouter: React.FC = () => {
  // const { timezone } = useCurrentTimezone();
  console.log('updated components')
  const element = useRoutes(routes);
  return <>{element}</>;
};

export default AppRouter; 