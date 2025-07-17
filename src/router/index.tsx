import React, { Suspense, type LazyExoticComponent } from "react";
import { useRoutes, type RouteObject } from "react-router-dom";
import TestLogin from "@/pages/test-login/TestLogin";
import Dashboard from "@/pages/Dashboard";
import Guard from "./permission-guard";
import NotFound from "@/pages/404";
import { flattenRoutes, permissionRoutes } from "./permission-router";

// 通用懒加载包装
function lazyLoad(
  cpm: LazyExoticComponent<() => JSX.Element>
): React.ReactNode {
  const Component = cpm;

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
      ...flattenRoutes(permissionRoutes).map((route) => {
        return {
          ...route,
          element: lazyLoad(
            route.element as LazyExoticComponent<() => JSX.Element>
          ),
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
  const element = useRoutes(routes as RouteObject[]);
  return <>{element}</>;
};

export default AppRouter;
