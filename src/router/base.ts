import { IBaseRouteItem } from "@type/index";
import { Roles } from "@enum/index";

const baseLayoutRoutes = [
  {
    path: "profile",
    component: () => import("@pages/Dashboard.vue"),
    meta: {
      title: "Личный какбинет",
      showNavLink: false,
    },
  },
  {
    path: "commercial-offer",
    component: () => import("@pages/CommercialOffer.vue"),
    meta: {
      title: "Коммерческое предложение",
      showNavLink: true,
    },
  },
  {
    path: "technical-task",
    component: () => import("@pages/TechnicalTask.vue"),
    meta: {
      title: "Техническое задание",
      showNavLink: true,
    },
  },
  {
    path: "registration-certificate",
    component: () => import("@pages/RegistrationCertificate.vue"),
    meta: {
      title: "Регистрационное удостоверение",
      showNavLink: true,
    },
  },
  {
    path: "statistics",
    component: () => import("@pages/Statistics.vue"),
    meta: {
      title: "Статистика",
      showNavLink: true,
    },
  },

  {
    path: "profile-register",
    component: () => import("@pages/Register.vue"),
    meta: {
      title: "Регистрация нового пользователя",
      showNavLink: false,
    },
  },
  // Requisites
  {
    path: "requisites/company-requisites",
    component: () => import("@pages/requisites/CompanyRequisites/index.vue"),
    meta: {
      subtitle: "Реквизиты компаний",
      showNavLink: false,
    },
  },
  {
    path: "requisites/end-client",
    component: () => import("@pages/requisites/EndClient/index.vue"),
    meta: {
      subtitle: "Конечный заказчик",
      showNavLink: false,
    },
  },
  {
    path: "requisites/contractor",
    component: () => import("@pages/requisites/Contractor/index.vue"),
    meta: {
      subtitle: "Контрагент",
      showNavLink: false,
    },
  },
];

export default baseLayoutRoutes;
