import React, { lazy, Suspense } from "react";
import { useRoutes } from "react-router-dom";
import TestLogin from "@/pages/test-login/TestLogin";
import Dashboard from "@/pages/Dashboard";
import Guard from "./permission-guard";
import NotFound from "@/pages/404";
import { permissionRoutes } from "./permission-router";
// import { useCurrentTimezone } from '../context/currentTimezoneContext';

// 通用懒加载包装
function lazyLoad(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  importFn: () => Promise<{ default: React.ComponentType<any> }>
): React.ReactNode {
  const Component = lazy(importFn);
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Component />
    </Suspense>
  );
}

export const routes = [
  {
    path: "/login",
    element: <TestLogin />,
    meta: {
      title: "Login",
    },
  },
  {
    path: "/",
    element: (
      <Guard>
        <Dashboard />
      </Guard>
    ),
    meta: {
      title: "Dashboard",
    },
    children: [
      ...permissionRoutes.map((route) => {
        return {
          ...route,
          element: lazyLoad(route.element),
        };
      }),
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

const AppRouter: React.FC = () => {
  // const { timezone } = useCurrentTimezone();
  console.log("updated components");
  const element = useRoutes(routes);
  return <>{element}</>;
};

export default AppRouter;
