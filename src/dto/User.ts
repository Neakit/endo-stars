export default class User {
    access_group: string;
    email: string;
    first_name: string;
    id: null;
    last_name: string;
    patronymic: string;
    phone_number: string;
    position: string;

    constructor(data: any) {
        this.access_group = data?.access_group || ''
        this.email        = data?.email || ''
        this.first_name   = data?.first_name || ''
        this.id           = data?.id || ''
        this.last_name    = data?.last_name || ''
        this.patronymic   = data?.patronymic || ''
        this.phone_number = data?.phone_number || ''
        this.position     = data?.position || ''
    }
}
