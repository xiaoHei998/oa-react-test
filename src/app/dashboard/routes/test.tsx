import { lazy } from "react";
const Home = lazy(() => import("@/app/dashboard/Home"))
const About = lazy(() => import("@/app/dashboard/About"))
export default [
  {
    path: "home",
    element: <Home/>,
    meta: {
      title: "Home",
    },
  },
  {
    path: "about",
    element: <About />,
    meta: {
      title: "About",
    },
  },
];
