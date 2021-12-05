import CounterpartyClass from "@dto/Counterparty";

const format = (value: number, pattern: string) => {
  let i = 0;
  const v = value.toString();
  return pattern.replace(/#/g, (_) => v[i++]);
};

const _prepareCounterpartyRes = (res: any): any => {
  const tableRes = { ...res };
  tableRes.results = res.results
    .map((c: any) => new CounterpartyClass(c))
    .map((c: any) => {
      let full_address = [c.address_street, c.address_index, c.address_city, c.address_country];
      full_address = full_address.filter((i) => i);

      c.full_address = full_address.reduce((acc, i, index, arr) => {
        return acc + `${i}` + (index === arr.length - 1 ? "" : ", ");
      }, "");

      return [
        { text: c.name },
        { text: c.inn },
        { text: c.full_address },
        {
          // text:  format(c.phone_number, "+7 (###) ###-##-##")
          html: `<span style="white-space: pre">${
            c.phone_number && format(c.phone_number, "+7 (###) ###-##-##")
          }</span>`,
        },
        {
          // text: c.email
          html: `<span style="white-space: pre">${c.email}</span>`,
        },
        { text: c.contact_person },
        { text: c.discount + " %" },
      ];
    });

  const offerPageRes = { ...res };
  offerPageRes.results = res.results
    .map((c: any) => new CounterpartyClass(c))
    .map((c: any) => {
      let full_address = [c.address_street, c.address_index, c.address_city, c.address_country];
      full_address = full_address.filter((i) => i);

      c.full_address = full_address.reduce((acc, i, index, arr) => {
        return acc + `${i}` + (index === arr.length - 1 ? "" : ", ");
      }, "");

      c.phone_number = c.phone_number ? format(c.phone_number, "+7 (###) ###-##-##") : "";
      return c;
    });

  res.results = res.results.map((c: any) => new CounterpartyClass(c));
  return {
    tableRes: tableRes,
    offerPageRes: offerPageRes,
    orig: res,
  };
};

export default class Counterparty {
  private sendRequestService: any;

  constructor(SendRequestService: any) {
    this.sendRequestService = SendRequestService;
  }

  getCounterpartyList(params = {}) {
    return this.sendRequestService("GET:PRIVATE", "api://counterparty", { params: params }, _prepareCounterpartyRes);
  }

  createCounterparty(data = {}) {
    return this.sendRequestService("POST:PRIVATE", "api://counterparty", { data: data });
  }

  getCounterpartyById(id: number, params = {}) {
    return this.sendRequestService("GET:PRIVATE", `api://counterparty/${id}`, { params: params });
  }

  putCounterpartyById(id: number, params = {}) {
    return this.sendRequestService("PUT:PRIVATE", `api://counterparty/${id}`, { params: params });
  }

  patchCounterpartyById(id: number, params = {}) {
    return this.sendRequestService("PATCH:PRIVATE", `api://counterparty/${id}`, { params: params });
  }

  deleteCounterpartyById(id: number, params = {}) {
    return this.sendRequestService("DELETE:PRIVATE", `api://counterparty/${id}`, { params: params });
  }
}
