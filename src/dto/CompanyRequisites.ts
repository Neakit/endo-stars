// prettier-ignore
export default class CompanyRequisites {
  
    #id
    #company
    #inn
    #address
    #phone
    #mail

    constructor(data: any) {
        this.#id      = data?.id        || null;
        this.#company  = data?.company    || "";
        this.#inn     = data?.inn       || "";
        this.#address  = data?.address    || ""
        this.#phone = data?.phone || "";
        this.#mail = data?.mail || "";
    }

    get id()       { return this.#id;       }
    get company()   { return this.#company;   }
    get inn()      { return this.#inn;      }
    get address()   { return this.#address;   }
    get phone() { return this.#phone; }
    get mail() { return this.#mail; }
}
