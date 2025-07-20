import type { RoutesConfig } from "@/app/types";
import paymentRoutes from "./payment";
import testWrapRoutes from "./test-wrap";
import testRoutes from "./test";
import type { DashboardRoutes } from "./types";
import { Suspense } from "react";

const routes: DashboardRoutes[] = [
  ...paymentRoutes,
  ...testWrapRoutes,
  ...testRoutes,
];

console.log("routes", routes);

export function flattenRoutesTree(routes: DashboardRoutes[]): RoutesConfig[] {
  const flattened: RoutesConfig[] = [];

  function traverse(nodes: DashboardRoutes[]) {
    for (const node of nodes) {
      // 如果节点有 element 属性，直接保存
      if (node.element) {
        const Component = node.element;
        flattened.push({
          path: node.path,
          element: (
            <Suspense fallback={<div>loading...</div>}>{Component}</Suspense>
          ),
        });
      }
      // 如果节点有 children 属性，递归处理子节点
      if (node.children && Array.isArray(node.children)) {
        traverse(node.children);
      }
    }
  }
  traverse(routes);
  return flattened;
}

export default routes;
