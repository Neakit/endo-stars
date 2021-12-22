import { prepareGetProductRes } from "./_prepareFunctions";
export default class Product {
  private sendRequestService: any;

  constructor(SendRequestService: any) {
    this.sendRequestService = SendRequestService;
  }

  getProductList(params = {}) {
    return this.sendRequestService("GET:PRIVATE", "api://product", { params: params }, prepareGetProductRes);
  }

  createProduct(data = {}) {
    return this.sendRequestService("POST:PRIVATE", "api://product", { data: data });
  }

  getProductById(id: number, params = {}) {
    return this.sendRequestService("GET:PRIVATE", `api://product/${id}`, { params: params });
  }

  putProductById(id: number, params = {}) {
    return this.sendRequestService("PUT:PRIVATE", `api://product/${id}`, { params: params });
  }

  patchProductById(id: number, params = {}) {
    return this.sendRequestService("PATCH:PRIVATE", `api://product/${id}`, { params: params });
  }

  deleteProductById(id: number, params = {}) {
    return this.sendRequestService("DELETE:PRIVATE", `api://product/${id}`, { params: params });
  }
}
