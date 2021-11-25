// import User from "@dto/User";
// import { Contractor } from "@type/index";

// const prepareLoginRes = (res: any) => {
//   return res;
// };

export default class Company {
  private sendRequestService: any;

  constructor(SendRequestService: any) {
    this.sendRequestService = SendRequestService;
  }

  getCompanyList(params = {}) {
    return this.sendRequestService("GET:PRIVATE", "api://company", { params: params });
  }

  createCompany(data = {}) {
    return this.sendRequestService("POST:PRIVATE", "api://company", { data: data });
  }

  getCompanyById(id: number, params = {}) {
    return this.sendRequestService("GET:PRIVATE", `api://company/${id}`, { params: params });
  }

  putCompanyById(id: number, params = {}) {
    return this.sendRequestService("PUT:PRIVATE", `api://company/${id}`, { params: params });
  }

  patchCompanyById(id: number, params = {}) {
    return this.sendRequestService("PATCH:PRIVATE", `api://company/${id}`, { params: params });
  }

  deleteCompanyById(id: number, params = {}) {
    return this.sendRequestService("DELETE:PRIVATE", `api://company/${id}`, { params: params });
  }
}
