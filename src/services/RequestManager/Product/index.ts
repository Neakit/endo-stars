// const _prepareGetProductRes = (res: any) => {
//   res.results = res.results.map((c: any) => {
//     let full_address = [c.address_street, c.address_index, c.address_city, c.address_country];
//     full_address = full_address.filter((i) => i);

//     c.full_address = full_address.reduce((acc, i, index, arr) => {
//       return acc + `${i}` + (index === arr.length - 1 ? "" : ", ");
//     }, "");

//     return [
//       { text: c.name },
//       { text: c.inn },
//       { text: c.full_address },
//       // TODO: сделать ссылкой на тел
//       // "поле неверно заполнено"
//       { html: `<span style="white-space: pre">${format(c.phone_number, "+7 (###) ###-##-##")}</span>` },
//       { html: `<span style="white-space: pre">${c.email}</span>` },
//     ];
//   });
//   return res;
// };

export default class Product {
  private sendRequestService: any;

  constructor(SendRequestService: any) {
    this.sendRequestService = SendRequestService;
  }

  getProductList(params = {}) {
    return this.sendRequestService("GET:PRIVATE", "api://product", { params: params });
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
