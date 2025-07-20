import { lazy } from "react";
const TestPage1 = lazy(() => import("@/app/dashboard/test-page1/TestPage1"))
const TestPage2 = lazy(() => import("@/app/dashboard/test-page2/TestPage2"))
const TestPage3 = lazy(() => import("@/app/dashboard/test-page3/TestPage3"))
export default [
  {
    path: "testPage1",
    element: <TestPage1 />,
    meta: {
      title: "Test Page 1",
    },
  },
  {
    path: "testPage2",
    element: <TestPage2 />,
    meta: {
      title: "Test Page 2",
    },
  },
  {
    path: "testPage3",
    element: <TestPage3 />,
    meta: {
      title: "Test Page 3",
    },
  },
];
