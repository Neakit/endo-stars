import CompanyClass from "@dto/Company";

const format = (value: number, pattern: string) => {
  let i = 0;
  const v = value.toString();
  return pattern.replace(/#/g, (_) => v[i++]);
};

const _prepareGetCompanyRes = (res: any) => {
  const tableRes = { ...res };
  tableRes.results = res.results.map((c: any) => {
    // full address formatter
    let full_address = [c.address_street, c.address_index, c.address_city, c.address_country];
    full_address = full_address.filter((i) => i);

    c.full_address = full_address.reduce((acc, i, index, arr) => {
      return acc + `${i}` + (index === arr.length - 1 ? "" : ", ");
    }, "");

    return [
      { text: c.name },
      { text: c.inn },
      { text: c.full_address },
      // TODO: сделать ссылкой на тел
      // "поле неверно заполнено"
      { html: `<span style="white-space: pre">${format(c.phone_number, "+7 (###) ###-##-##")}</span>` },
      { html: `<span style="white-space: pre">${c.email}</span>` },
    ];
  });
  res.results = res.results.map((c: any) => new CompanyClass(c));
  return {
    tableRes: tableRes,
    orig: res,
  };
};

export default class Company {
  private sendRequestService: any;

  constructor(SendRequestService: any) {
    this.sendRequestService = SendRequestService;
  }

  getCompanyList(params = {}) {
    return this.sendRequestService("GET:PRIVATE", "api://company", { params: params }, _prepareGetCompanyRes);
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
