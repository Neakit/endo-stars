export default class Counterparty {

  id:	number | null;
  name:	string;
  inn: number;
  address_street:	string;
  address_city:	string;
  address_country: string;
  address_index: number;
  phone_number:	number;
  email: string;
  contact_person:	string;
  discount: number;
    
  constructor(data: any) {
    this.id              = data?.id              || null;
    this.name            = data?.name            || "";
    this.inn             = data?.inn             || null;
    this.address_street  = data?.address_street  || "";
    this.address_city    = data?.address_city    || "";
    this.address_country = data?.address_country || "";
    this.address_index   = data?.address_index   || null;
    this.phone_number    = data?.phone_number    || null;
    this.email           = data?.email           || "";
    this.contact_person  = data?.contact_person  || "";
    this.discount        = data?.discount        || "";
  }
}
  