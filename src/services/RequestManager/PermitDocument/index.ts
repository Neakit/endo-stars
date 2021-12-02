export default class PermitDocument {
  private sendRequestService: any;

  constructor(SendRequestService: any) {
    this.sendRequestService = SendRequestService;
  }

  getPermitDocumentList(params = {}) {
    return this.sendRequestService("GET:PRIVATE", "api://permit_document", { params: params });
  }

  createPermitDocument(data = {}) {
    return this.sendRequestService("POST:PRIVATE", "api://permit_document", { data: data });
  }

  getPermitDocumentById(id: number, params = {}) {
    return this.sendRequestService("GET:PRIVATE", `api://permit_document/${id}`, { params: params });
  }

  putPermitDocumentById(id: number, params = {}) {
    return this.sendRequestService("PUT:PRIVATE", `api://permit_document/${id}`, { params: params });
  }

  patchPermitDocumentById(id: number, params = {}) {
    return this.sendRequestService("PATCH:PRIVATE", `api://permit_document/${id}`, { params: params });
  }

  deletePermitDocumentById(id: number, params = {}) {
    return this.sendRequestService("DELETE:PRIVATE", `api://permit_document/${id}`, { params: params });
  }
}
