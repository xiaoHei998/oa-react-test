import Guard from "@/router/guard";
import Dashboard from "./dashboard/dashboard";
import Login from "./login-page/login";
import NotFound from "./not-found";
import dashboardRoutes, { flattenRoutesTree } from "./dashboard/routes";
import type { RouteObject } from "react-router-dom";
const routes: RouteObject[] = [
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: (
      <Guard>
        <Dashboard />
      </Guard>
    ),
    children: flattenRoutesTree(dashboardRoutes),
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

export default routes;
