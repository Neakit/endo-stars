import { IBaseRouteItem } from "@type/index";
import { Roles } from "@enum/index";

const baseLayoutRoutes = [
  {
    path: "offer",
    component: () => import("@pages/Offer.vue"),
    meta: {
      title: "Личный какбинет",
      showNavLink: false,
    },
  },
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
    component: () => import("@pages/offer/index.vue"),
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
    path: "offer-test",
    component: () => import("@pages/OfferTest.vue"),
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
    path: "requisites/company",
    component: () => import("@pages/requisites/Company/index.vue"),
    meta: {
      subtitle: "Реквизиты компаний",
      showNavLink: false,
    },
  },
  {
    path: "requisites/end-customer",
    component: () => import("@pages/requisites/EndCustomer/index.vue"),
    meta: {
      subtitle: "Конечный заказчик",
      showNavLink: false,
    },
  },
  {
    path: "requisites/counterparty",
    component: () => import("@pages/requisites/Counterparty/index.vue"),
    meta: {
      subtitle: "Контрагент",
      showNavLink: false,
    },
  },
];

export default baseLayoutRoutes;
