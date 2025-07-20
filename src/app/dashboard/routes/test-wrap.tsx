import { lazy } from "react";
const TestPage4 = lazy(() => import("../test-wrap/test-page4/TestPage4"))
const TestPage5 = lazy(() => import("../test-wrap/test-page5/TestPage5"))
export default [
  {
    path: "testWrap",
    meta: {
      title: "testWrap",
    },
    children: [
      {
        path: "testWrap/testPage4",
        element: <TestPage4 />,
        meta: {
          title: "Test Page 4",
        },
      },
      {
        path: "testWrap/testPage5",
        element: <TestPage5 />,
        meta: {
          title: "Test Page 5",
        },
      },
    ],
  },
];
