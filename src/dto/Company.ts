export default class Company {
  
    id: number;
    name: string;
    inn: number; //* 
    address_street: string;
    address_city: string;
    address_country: string;
    address_index:	number;
    phone_number: number;
    email:	string;
    blank_photo: File;
    logo: File;
    director_full_name: string; // *
    director_position: string; // *

    constructor(data: any) {
        this.id                 = data?.id || null;
        this.name               = data?.name || '';
        this.inn                = data?.inn || ''; // * 
        this.address_street     = data?.address_street || '';
        this.address_city       = data?.address_city || '';
        this.address_country    = data?.address_country || '';
        this.address_index      = data?.address_index || '';
        this.phone_number       = data?.phone_number || '';
        this.email              = data?.email || '';
        this.blank_photo        = data?.blank_photo || null;
        this.logo               = data?.logo || null;
        this.director_full_name = data?.director_full_name || ''; // *
        this.director_position  = data?.director_position || ''; // *
    }

    get full_address () { return 'full'; }
}
