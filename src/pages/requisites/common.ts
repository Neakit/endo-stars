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

export const counterPartyConfig = {
  columns: [
    {
      alwaysExpanded: true,
      headline: "Контрагент",
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
    {
      alwaysExpanded: true,
      headline: "Контактное лицо",
      breakpoint: "md",
    },
    {
      alwaysExpanded: true,
      headline: "Скидка",
      breakpoint: "md",
    },
  ],
  select: false,
};
