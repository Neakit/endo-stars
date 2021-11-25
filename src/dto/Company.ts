// prettier-ignore
export default class Company {
  
    id: number;
    full_name: string;
    abbreviated_name: string;
    inn: number;
    kpp: number;
    illegal_address_index:	number;
// title: Индекс юр адреса
// maximum: 2147483647
// minimum: 0
illegal_address_city:	string;
// title: Город юр адреса
// maxLength: 64
// minLength: 1
illegal_address_street:	string;
// title: Юридический адрес
// maxLength: 256
// minLength: 1
actual_address_index:	number;
// title: Фактический индекс
// maximum: 2147483647
// minimum: 0
actual_address_city:	string;
// title: Фактический город
// maxLength: 64
// minLength: 1
actual_address_street:	string;
// title: Фактический адрес
// maxLength: 256
// minLength: 1
phone_number:	number;
// title: Номер телефона
// maximum: 9223372036854776000
// minimum: 0
email:	string;
// title: Электронная почта
// maxLength: 254
// minLength: 1
bank_name:	string;
// title: Наименование банка
// maxLength: 128
// minLength: 1
bank_bik:	number;
// title: БИК
// maximum: 9223372036854776000
// minimum: 0
payment_account:	number;
// title: Расчётный счёт
// maximum: 9223372036854776000
// minimum: 0
correspondent_account:	number;
// title: Корреспондентский счёт
// maximum: 9223372036854776000
// minimum: 0
blank_photo:	string;
// title: Оттиск печати
// readOnly: true
logo:	string;
// title: Лого
// readOnly: true
director_full_name:	string;
// title: ФИО руководителя
// maxLength: 128
// minLength: 1
director_position:	string;
// title: Должность руководителя
// maxLength: 64
// minLength: 1

    constructor(data: any) {
        this.id                     = data.id                     || null;
        this.full_name              = data.full_name              || "";
        this.abbreviated_name       = data.abbreviated_name       || "";
        this.inn                    = data.inn                    || 0;
        this.kpp                    = data.kpp                    || 0;

        this.illegal_address_index  = data.illegal_address_index  || 0;
        this.illegal_address_city   = data.illegal_address_city   || "";
        this.illegal_address_street = data.illegal_address_street || "";
        this.actual_address_index   = data.actual_address_index   || 0;
        this.actual_address_city    = data.actual_address_city    || "";
        this.actual_address_street  = data.actual_address_street  || "";

        this.phone_number           = data.phone_number           || 0;
        this.email                  = data.email                  || "";
        this.bank_name              = data.bank_name              || "";
        this.bank_bik               = data.bank_bik               || 0;
        this.payment_account        = data.payment_account        || 0;
        this.correspondent_account  = data.correspondent_account  || 0;
        this.blank_photo            = data.blank_photo            || "";
        this.logo                   = data.logo                   || "";
        this.director_full_name     = data.director_full_name     || "";
        this.director_position      = data.director_position      || "";
    }
}
