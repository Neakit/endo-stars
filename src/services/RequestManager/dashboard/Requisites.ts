// import User from "@dto/User";
import { Contractor } from "@type/index";

// const prepareLoginRes = (res: any) => {
//   return res;
// };

export default class Requisites {
  private sendRequestService: any;

  constructor(SendRequestService: any) {
    this.sendRequestService = SendRequestService;
  }

  getContractorTable(params = {}) {
    return this.sendRequestService("GET:PRIVATE", "api://440/contractor", { params: params });
  }

  addContractor(data: Contractor) {
    return this.sendRequestService("POST:PRIVATE", "api://664/contractor", { data: data });
  }

  getEndClientTable(params = {}) {
    return this.sendRequestService("GET:PRIVATE", "api://440/endclient", { params: params });
  }

  addEndClient(data: any) {
    return this.sendRequestService("POST:PRIVATE", "api://664/endclient", { data: data });
  }

  getCompanyRequisitesTable(params = {}) {
    return this.sendRequestService("GET:PRIVATE", "api://440/companyRequisites", { params: params });
  }

  addCompanyRequisites(data: any) {
    return this.sendRequestService("POST:PRIVATE", "api://664/companyRequisites", { data: data });
  }
}
