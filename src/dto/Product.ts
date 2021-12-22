export default class OfferProduct {
    id: null;
    price: string;
    discount: number;
    count: number;
    cost: string;
    offer: string;
    product: string;

    constructor(data: any) {
        this.id       = data?.id || null
        this.price    = data?.price || ''
        this.discount = data?.discount || 0
        this.count    = data?.count || 0
        this.cost     = data?.cost || ''
        this.offer    = data?.offer || null
        this.product  = data?.product || null
    }
}
