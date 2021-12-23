import OfferProduct from "./Product";
import Company from "./Company"; 
import Counterparty from "./Counterparty";
import EndCustomer from "./EndCustomer";
import dayjs from 'dayjs'
import 'dayjs/locale/ru'; 
dayjs.locale('ru') 
console.log('dayjs', dayjs);

export default class Offer {
    id: number | null;
    created_at: string;
    counterparty: Counterparty;
    exploration_date: string;
    end_customer: string;
    company: Company;
    offer_products: Array<OfferProduct>;
    total_cost: number;
    supply_terms: string;
    was_send: string;
    send_datetime: string;
    tech_docs_format: string;
    kp_exel_file: null;
    kp_pdf_file: null;
    krtu_avg_file: null;
    krtu_file: null;
    krtu_gost_file: null;
    ru_file: null;

    constructor(data: any) {
        // all
        this.id               = data?.id               || null;
        this.created_at       = data?.created_at       && dayjs(data?.created_at) || null;
        this.exploration_date = data?.exploration_date || null;
        this.total_cost       = data?.total_cost       || 0.00;
        this.supply_terms     = data?.supply_terms     || null;
        this.was_send         = data?.was_send         || null;
        this.send_datetime    = data?.send_datetime    || null;
        this.tech_docs_format = data?.tech_docs_format || null;
        // nested
        this.counterparty     = data?.counterparty && new Counterparty(data.counterparty) || new Counterparty({ });
        this.end_customer     = data?.end_customer && new EndCustomer(data.end_customer)  || new EndCustomer({ })
        this.company          = data?.company      && new Company(data.company)           || new Company({ });
        // nested classes
        this.offer_products   = data?.offer_products && data.offer_products.map((p: OfferProduct) => new OfferProduct(p)) || []

        this.kp_exel_file = data?.kp_exel_file || null;
        this.kp_pdf_file = data?.kp_pdf_file || null;
        this.krtu_avg_file = data?.krtu_avg_file || null;
        this.krtu_file = data?.krtu_file || null;
        this.krtu_gost_file = data?.krtu_gost_file || null;
        this.ru_file = data?.ru_file || null;
    }
}
