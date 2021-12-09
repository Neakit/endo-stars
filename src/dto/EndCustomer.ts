export default class EndCustomer {
    id: number;
    name: string;
    inn: number;
    region:	string;
    city: string;
    head_of_endoscopy_full_name: string;
    
    constructor(data: any) {
        this.id     = data?.id     || null;
        this.name   = data?.name   || " "; 
        this.inn    = data?.inn    || " "; 
        this.region = data?.region || " "; 
        this.city   = data?.city   || " "; 
        this.head_of_endoscopy_full_name = data?.head_of_endoscopy_full_name || " "; 
    }
  }
  