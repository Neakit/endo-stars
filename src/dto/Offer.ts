import OfferProduct from "./Product";

export default class Offer {
    id: null;
    created_at: string;
    counterparty: string;
    exploration_date: string;
    end_customer: string;
    company: string;
    offer_products: Array<OfferProduct>;
    total_cost: string;
    supply_terms: string;
    was_send: string;
    send_datetime: string;
    tech_docs_format: string;

    constructor(data: any) {
        this.id               = data?.id || ''
        this.created_at       = data?.created_at || ''
        this.counterparty     = data?.counterparty || ''
        this.exploration_date = data?.exploration_date || ''
        this.end_customer     = data?.end_customer || ''
        this.company          = data?.company || ''
        this.offer_products   = data?.offer_products || data?.offer_products.map((p: OfferProduct) => new OfferProduct(p))
        this.total_cost       = data?.total_cost || ''
        this.supply_terms     = data?.supply_terms || ''
        this.was_send         = data?.was_send || ''
        this.send_datetime    = data?.send_datetime || ''
        this.tech_docs_format = data?.tech_docs_format || ''

    }

    // get id()               { return this.#id; }
    // get created_at()       { return this.#created_at; }
    // get counterparty()     { return this.#counterparty; }
    // get exploration_date() { return this.#exploration_date; }
    // get end_customer()     { return this.#end_customer; }
    // get company()          { return this.#company; }
    // get offer_products()   { return this.#offer_products; }
    // get total_cost()       { return this.#total_cost; }
    // get supply_terms()     { return this.#supply_terms; }
    // get was_send()         { return this.#was_send; }
    // get send_datetime()    { return this.#send_datetime; }
    // get tech_docs_format() { return this.#tech_docs_format; }
}
