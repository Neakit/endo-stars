export const fields = [
  {
    key: "number",
    label: "Номер",
  },
  {
    key: "created_at",
    label: "Дата создания",
  },
  {
    key: "price",
    label: "Стоимость",
  },
  {
    key: "contractor",
    label: "Контрагент",
  },
  {
    key: "discount",
    label: "Скидка",
  },
  {
    key: "region",
    label: "Регион",
  },
  {
    key: "actions",
    label: "",
  },
];

export const productTableConfig = {
  columns: [
    {
      alwaysExpanded: true,
      headline: "id",
      breakpoint: "md",
    },
    {
      alwaysExpanded: true,
      headline: "Артикул",
      breakpoint: "md",
    },
    {
      headline: "Наименование",
      alwaysExpanded: true,
      breakpoint: "md",
    },
    {
      alwaysExpanded: true,
      headline: "Цена",
      breakpoint: "md",
    },
    {
      alwaysExpanded: true,
      headline: "Кол-во",
      breakpoint: "md",
    },
    {
      alwaysExpanded: true,
      headline: "Скидка",
      breakpoint: "md",
    },
    {
      alwaysExpanded: true,
      headline: "Стоимость",
      breakpoint: "md",
    },
    {
      alwaysExpanded: true,
      headline: " ",
      breakpoint: "md",
    },
  ],
  select: false,
};
