export default class OfferProduct {
    #id: null;
    #price: string;
    #discount: string;
    #count: string;
    #cost: string;
    #offer: string;
    #product: string;

    constructor(data: any) {
        this.#id       = data?.id || ''
        this.#price    = data?.price || ''
        this.#discount = data?.discount || ''
        this.#count    = data?.count || ''
        this.#cost     = data?.cost || ''
        this.#offer    = data?.offer || ''
        this.#product  = data?.product || ''
    }

    get id()       { return this.#id; }
    get price()    { return this.#price; }
    get discount() { return this.#discount; }
    get count()    { return this.#count; }
    get cost()     { return this.#cost; }
    get offer()    { return this.#offer; }
    get product()  { return this.#product; }
}
