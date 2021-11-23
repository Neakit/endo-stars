// prettier-ignore
export default class EndClient {

    #id
    #client
    #inn
    #region
    #fullname

    constructor(data: any) {
        this.#id      = data?.id        || null;
        this.#client  = data?.client    || "";
        this.#inn     = data?.inn       || "";
        this.#region  = data?.region    || ""
        this.#fullname = data?.fullname || "";
    }

    get id()       { return this.#id;       }
    get client()   { return this.#client;   }
    get inn()      { return this.#inn;      }
    get region()   { return this.#region;   }
    get fullname() { return this.#fullname; }
}
