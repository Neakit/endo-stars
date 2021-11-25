export default class LPU {
  private sendRequestService: any;

  constructor(SendRequestService: any) {
    this.sendRequestService = SendRequestService;
  }

  getLPUList(params = {}) {
    return this.sendRequestService("GET:PRIVATE", "api://lpu", { params: params });
  }

  createLPU(data = {}) {
    return this.sendRequestService("POST:PRIVATE", "api://lpu", { data: data });
  }

  getLPUById(id: number, params = {}) {
    return this.sendRequestService("GET:PRIVATE", `api://lpu/${id}`, { params: params });
  }

  putLPUById(id: number, params = {}) {
    return this.sendRequestService("PUT:PRIVATE", `api://lpu/${id}`, { params: params });
  }

  patchLPUById(id: number, params = {}) {
    return this.sendRequestService("PATCH:PRIVATE", `api://lpu/${id}`, { params: params });
  }

  deleteLPUById(id: number, params = {}) {
    return this.sendRequestService("DELETE:PRIVATE", `api://lpu/${id}`, { params: params });
  }
}
