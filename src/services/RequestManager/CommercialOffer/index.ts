import { prepareOfferListResponse } from "./_prepareResponse";

export default class CommercialOffer {
  private sendRequestService: any;

  constructor(SendRequestService: any) {
    this.sendRequestService = SendRequestService;
  }

  getOfferList(params = {}) {
    return this.sendRequestService("GET:PRIVATE", "api://offer", { params: params }, prepareOfferListResponse);
  }

  createOffer(data = {}) {
    return this.sendRequestService("POST:PRIVATE", "api://offer", { data: data });
  }

  getOfferById(id: number, params = {}) {
    return this.sendRequestService("GET:PRIVATE", `api://offer/${id}`, { params: params });
  }

  putOfferById(id: number, params = {}) {
    return this.sendRequestService("PUT:PRIVATE", `api://offer/${id}`, { params: params });
  }

  patchOfferById(id: number, params = {}) {
    return this.sendRequestService("PATCH:PRIVATE", `api://offer/${id}`, { params: params });
  }

  deleteOfferById(id: number, params = {}) {
    return this.sendRequestService("DELETE:PRIVATE", `api://offer/${id}`, { params: params });
  }
}
