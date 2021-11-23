export interface IBaseRouteItem {
  path: string;
  component: Function;
  redirect?: string;
  meta: {
    title: string;
    showNavLink: boolean;
    authorize?: Array<string>;
  };
}

export type Contractor = {
  contractor: string;
  inn: string;
  address: string;
  phone: string;
  mail: string;
  contact: string;
  discount: string;
};
