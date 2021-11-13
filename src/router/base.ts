import { IBaseRouteItem } from "@type/index";

const baseLayoutRoutes: Array<IBaseRouteItem> = [
  {
    path: 'dashboard',
    component: () => import('@pages/Dashboard.vue'),
    meta: {
      title: "Личный какбинет",
      showNavLink: false,
    }
  },
  {
    path: 'commercial-offer',
    component: () => import('@pages/CommercialOffer.vue'),
    meta: {
      title: "Коммерческое предложение",
      showNavLink: true
    }
  },
  {
    path: 'technical-task',
    component: () => import('@pages/TechnicalTask.vue'),
    meta: {
      title: "Техническое задание",
      showNavLink: true
    }
  },
  {
    path: 'registration-certificate',
    component: () => import('@pages/RegistrationCertificate.vue'),
    meta: {
      title: "Регистрационное удостоверение",
      showNavLink: true
    }
  },
  {
    path: 'statistics',
    component: () => import('@pages/Statistics.vue'),
    meta: {
      title: "Статистика",
      showNavLink: true
    }
  },
  {
    path: 'requisites',
    component: () => import('@pages/Requisites.vue'),
    meta: {
      title: "Реквизиты",
      showNavLink: true
    }
  },
]

export default baseLayoutRoutes;