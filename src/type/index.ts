export interface IBaseRouteItem {
    path: string,
    component: Function,
    redirect?: string,
    meta: {
        title: string,
        showNavLink: boolean
    }
}