// prettier-ignore
export default class Contractor {
    #contractor
    #inn
    #address
    #phone
    #mail
    #contact
    #discount

    constructor(data: any) {
        this.#contractor = data?.contractor || "";
        this.#inn        = data?.inn        || "";
        this.#address    = data?.address    || "";
        this.#phone      = data?.phone      || "";
        this.#mail       = data?.mail       || "";
        this.#contact    = data?.contact    || "";
        this.#discount   = data?.discount   || "";
    }

    get contractor() { return this.#contractor; }
    get inn()        { return this.#inn;        }
    get address()    { return this.#address;    }
    get phone()      { return this.#phone;      }
    get mail()       { return this.#mail;       }
    get contact()    { return this.#contact;    }
    get discount()   { return this.#discount;   }
}
