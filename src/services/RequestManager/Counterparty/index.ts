export default class Counterparty {
  private sendRequestService: any;

  constructor(SendRequestService: any) {
    this.sendRequestService = SendRequestService;
  }

  getCounterpartyList(params = {}) {
    return this.sendRequestService("GET:PRIVATE", "api://counterparty", { params: params });
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
