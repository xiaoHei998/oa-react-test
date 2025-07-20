import type { LazyExoticComponent } from "react";

export interface RoutesConfig {
  path: string;
  element?: JSX.Element;
  children?: RoutesConfig[];
}


export interface RoutesMeta {
  title: string;
}
