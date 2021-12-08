export const prepareOfferListResponse = (res: any) => {
  const tableRes = { ...res };

  tableRes.results = res.results.map((offer: any) => {
    return [
      {
        key: "select",
        item: offer,
        select: true,
      },
      {
        key: "id",
        text: offer.id,
      },
      {
        key: "created_at",
        text: offer.created_at,
      },
      {
        key: "cost",
        text: "545 757 843,00 ₽",
      },
      {
        key: "counterparty",
        text: offer.counterparty.name || "-",
      },
      {
        key: "discount",
        text: "30%",
      },
      {
        key: "region",
        text: "г. Иваново",
      },
      {
        key: "actions",
        actions: "",
      },
    ];
  });

  // res.results = res.results.map((c: any) => new CompanyClass(c));

  return {
    tableRes: tableRes,
    orig: res,
  };
};
