export default class Product {
  private sendRequestService: any;

  constructor(SendRequestService: any) {
    this.sendRequestService = SendRequestService;
  }

  techDocsGetDownloadLink(data = {}) {
    return this.sendRequestService("POST:PRIVATE", "api://tech-docs/download", { data: data });
  }

  techDocsSendToEMail(data = {}) {
    return this.sendRequestService("POST:PRIVATE", "api://tech-docs/send-to-email", { data: data });
  }

  techDocsSendToEMailByOffer(data = {}) {
    return this.sendRequestService("POST:PRIVATE", "api://tech-docs/send-to-email", { data: data });
  }
}
