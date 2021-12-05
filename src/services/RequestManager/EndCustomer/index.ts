const _prepareEndCustomerRes = (res: any) => {
  const tableRes = { ...res };
  tableRes.results = res.results.map((c: any) => {
    return [
      { text: c.name },
      { text: c.inn },
      { text: c.region },
      { text: c.city },
      { text: c.head_of_endoscopy_full_name },
    ];
  });
  return {
    orig: res,
    tableRes: tableRes,
  };
};

export default class EndCustomer {
  private sendRequestService: any;

  constructor(SendRequestService: any) {
    this.sendRequestService = SendRequestService;
  }

  getEndCustomerList(params = {}) {
    return this.sendRequestService("GET:PRIVATE", "api://end-customer", { params: params }, _prepareEndCustomerRes);
  }

  createEndCustomer(data = {}) {
    return this.sendRequestService("POST:PRIVATE", "api://end-customer", { data: data });
  }

  getEndCustomerById(id: number, params = {}) {
    return this.sendRequestService("GET:PRIVATE", `api://end-customer/${id}`, { params: params });
  }

  putEndCustomerById(id: number, params = {}) {
    return this.sendRequestService("PUT:PRIVATE", `api://end-customer/${id}`, { params: params });
  }

  patchEndCustomerById(id: number, params = {}) {
    return this.sendRequestService("PATCH:PRIVATE", `api://end-customer/${id}`, { params: params });
  }

  deleteEndCustomerById(id: number, params = {}) {
    return this.sendRequestService("DELETE:PRIVATE", `api://end-customer/${id}`, { params: params });
  }
}
