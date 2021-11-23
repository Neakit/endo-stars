// prettier-ignore
export default class User {
    #id
    #email
    #role
    #firstname
    #lastname
    #phone

    constructor(data: any) {
        this.#id        = data?.id        || null;
        this.#email     = data?.email     || null;
        this.#role      = data?.role      || null;
        this.#firstname = data?.firstname || ""
        this.#lastname  = data?.lastname  || "";
        this.#phone     = data?.phone     || "";
    }

    get id()        { return this.#id;        }
    get email()     { return this.#email;     }
    get role()      { return this.#role;      }
    get firstname() { return this.#firstname; }
    get lastname()  { return this.#lastname;  }
    get phone()     { return this.#phone;     }
    // custom fields
    get fullname()  { return `${this.#firstname} ${this.#lastname}` }
}
