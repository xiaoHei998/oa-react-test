import { lazy } from "react";
import type { ComponentType } from "react";
import TestPage5  from "@/pages/test-page5/TestPage5"
export const permissionRoutes: RouteNode[] = [
  {
    path: "testPage1",
    element: lazy(() => import("@/pages/test-page1/TestPage1")),
    meta: {
      title: "Test Page 1",
    },
  },
  {
    path: "testPage2",
    element: lazy(() => import("@/pages/test-page2/TestPage2")),
    meta: {
      title: "Test Page 2",
    },
  },
  {
    path: "testPage3",
    element: lazy(() => import("@/pages/test-page3/TestPage3")),
    meta: {
      title: "Test Page 3",
    },
  },
  {
    path: "testWrap",
    meta: {
      title: "testWrap",
    },
    children: [
      {
        path: "testWrap/testPage4",
        element: lazy(() => import("@/pages/test-page4/TestPage4")),
        meta: {
          title: "Test Page 4",
        },
      },
      {
        path: "testWrap/testPage5",
        element: TestPage5 as unknown as JSX.Element,
        meta: {
          title: "Test Page 5",
        },
      },
    ],
  },
  {
    path: 'home',
    element: lazy(() => import("@/pages/Home")),
    meta: {
      title: "Home",
    },
  }
];

// 扁平化路由数组的工具函数
export interface RouteNode {
  path: string;
  element?: React.LazyExoticComponent<ComponentType> | JSX.Element;
  meta?: {
    title: string;
  };
  children?: RouteNode[];
}

export function flattenRoutes(routes: RouteNode[]): RouteNode[] {
  const flattened: RouteNode[] = [];

  function traverse(nodes: RouteNode[]) {
    for (const node of nodes) {
      // 如果节点有 element 属性，直接保存
      if (node.element) {
        flattened.push(node);
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

// 使用示例：
const flattenedRoutes = flattenRoutes(permissionRoutes);

console.log(flattenedRoutes, 'hhhhhhhhh');

// 侧边栏导航项接口


// console.log('asdqweqweqwe', sidebarItems)
