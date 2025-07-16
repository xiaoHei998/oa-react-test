export const permissionRoutes = [
  {
    path: "testPage1",
    element: () => import("@/pages/test-page1/TestPage1"),
    meta: {
      title: "Test Page 1",
    },
  },
  {
    path: "testPage2",
    element: () => import("@/pages/test-page2/TestPage2"),
    meta: {
      title: "Test Page 2",
    },
  },
  {
    path: "testPage3",
    element: () => import("@/pages/test-page3/TestPage3"),
    meta: {
      title: "Test Page 3",
    },
  },
  {
    path: "testWrap/testPage4",
    element: () => import("@/pages/test-page4/TestPage4"),
    meta: {
      title: "Test Page 4",
    },
  },
  {
    path: "testWrap/testPage5",
    element: () => import("@/pages/test-page5/TestPage5"),
    meta: {
      title: "Test Page 5",
    },
  },
];
