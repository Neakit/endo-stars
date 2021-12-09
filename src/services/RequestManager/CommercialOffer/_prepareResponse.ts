import Offer from "@dto/Offer";

export const prepareOfferListResponse = (res: any) => {
  res.results = res.results.map((offer: Offer) => new Offer(offer));

  const tableRes = { ...res };
  tableRes.results = res.results.map((offer: any) => {
    const tableCells = [
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
        text: offer.created_at.format("DD MMMM YYYY"),
      },
      {
        key: "cost",
        text: `${offer.total_cost} ₽`,
      },
      {
        key: "counterparty",
        text: offer.counterparty.name || "-",
      },
      {
        key: "discount",
        text: `${offer.counterparty.discount} %`,
      },
      {
        key: "region",
        text: offer.end_customer.region,
      },
      {
        key: "actions",
      },
    ];
    return tableCells;
  });

  console.log("tableRes", tableRes);

  return {
    tableRes: tableRes,
    orig: res,
  };
};
