export const prepareProductForTable = (product: any, index: number) => {
  const tableCells = [
    {
      key: "article",
      text: product.article,
      item: product,
      index: index,
    },
    {
      key: "name",
      text: product.name,
      item: product,
      index: index,
    },
    {
      item: product,
      key: "actions",
      index: index,
    },
  ];
  return tableCells;
};

export const prepareGetProductRes = (res: any) => {
  const tableRes = { ...res };
  tableRes.results = tableRes.results.map(prepareProductForTable);
  // tableRes.results = tableRes.results.map();
  return {
    tableRes: tableRes,
    orig: res,
  };
};
