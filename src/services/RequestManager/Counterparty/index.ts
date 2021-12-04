const format = (value: number, pattern: string) => {
  let i = 0;
  const v = value.toString();
  return pattern.replace(/#/g, (_) => v[i++]);
};

const _prepareCounterpartyRes = (res: any) => {
  res.results = res.results.map((c: any) => {
    let full_address = [c.address_street, c.address_index, c.address_city, c.address_country];
    full_address = full_address.filter((i) => i);

    c.full_address = full_address.reduce((acc, i, index, arr) => {
      return acc + `${i}` + (index === arr.length - 1 ? "" : ", ");
    }, "");

    return [
      { text: c.name },
      { text: c.inn },
      { text: c.full_address },
      { text: format(c.phone_number, "+7 (###) ###-##-##") },
      { text: c.email },
      { text: c.contact_person },
      { text: c.discount + " %" },
    ];
  });
  return res;
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
