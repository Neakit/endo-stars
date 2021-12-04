export const lpuFields = [
  {
    key: "abbreviated_name",
    label: "Конечный заказчик",
    sortable: false,
  },
  {
    key: "inn",
    label: "ИНН",
    sortable: false,
  },
  {
    key: "region",
    label: "Регион",
  },
  {
    key: "actual_address_city",
    label: "Город",
  },
  {
    key: "director_full_name",
    label: "ФИО заведующего эндоскопии",
    sortable: false,
  },
];

export const counterPartyFields = [
  {
    key: "abbreviated_name",
    label: "Контрагент",
    width: "14%",
  },
  {
    key: "inn",
    label: "ИНН",
    width: "10%",
  },
  {
    key: "actual_address_street",
    label: "Адрес",
    width: "20%",
  },
  {
    key: "phone_number",
    label: "Телефон",
  },
  {
    key: "email",
    label: "Эл. почта",
  },
  {
    key: "director_full_name",
    label: "Контактное лицо",
  },
  {
    key: "discount",
    label: "Скидка",
    width: "7%",
  },
];

export const companyFields = [
  {
    key: "name",
    label: "Компания",
  },
  {
    key: "inn",
    label: "ИНН",
  },
  {
    key: "full_address",
    label: "Адрес",
  },
  {
    key: "phone_number",
    label: "Телефон",
  },
  {
    key: "email",
    label: "Эл. почта",
  },
];

export const companyConfig = {
  columns: [
    {
      alwaysExpanded: true,
      headline: "Компания",
      breakpoint: "md",
    },
    {
      headline: "ИНН",
      alwaysExpanded: true,
      breakpoint: "md",
    },
    {
      alwaysExpanded: true,
      headline: "Адрес",
      breakpoint: "md",
    },
    {
      alwaysExpanded: true,
      headline: "Телефон",
      breakpoint: "md",
    },
    {
      alwaysExpanded: true,
      headline: "Эл. почта",
      breakpoint: "md",
    },
  ],
  select: false,
};
