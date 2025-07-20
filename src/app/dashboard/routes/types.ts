export interface DashboardRoutes {
    path: string
    element?: JSX.Element
    meta: { title: string }
    children?: DashboardRoutes[]
}