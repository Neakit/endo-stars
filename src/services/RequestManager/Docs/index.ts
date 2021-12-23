export default class Product {
  private sendRequestService: any;

  constructor(SendRequestService: any) {
    this.sendRequestService = SendRequestService;
  }

  // Tech
  techDocsGetDownloadLink(data = {}) {
    return this.sendRequestService("POST:PRIVATE", "api://tech-docs/download", { data: data });
  }

  techDocsSendToEMail(data = {}) {
    return this.sendRequestService("POST:PRIVATE", "api://tech-docs/send-to-email", { data: data });
  }

  techDocsSendToEMailByOffer(data = {}, id: number) {
    return this.sendRequestService("POST:PRIVATE", `api://offer/${id}/send-to-email`, { data: data });
  }

  // Permit
  permitDocsGetDownloadLink(data = {}) {
    return this.sendRequestService("POST:PRIVATE", "api:///permit-document/download", { data: data });
  }

  // /permit-document/send-to-email
}
