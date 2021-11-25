export default class LPU {
    id:	number;
    // title: Id
    // readOnly: true
    full_name:	string;
    // title: Полное наименование
    // maxLength: 128
    // minLength: 1
    abbreviated_name:	string;
    // title: Сокращённое наименование
    // maxLength: 100
    // minLength: 1
    inn:	number;
    // title: ИНН
    // maximum: 9223372036854776000
    // minimum: 0
    kpp:	number;
    // title: КПП
    // maximum: 9223372036854776000
    // minimum: 0
    illegal_address_index:	number
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
    director_full_name:	string;
    // title: ФИО руководителя
    // maxLength: 128
    // minLength: 1
    director_position:	string;
    // title: Должность руководителя
    // maxLength: 64
    // minLength: 1
    
    constructor(data: any) {
        this.id                     = data?.id                     || null;
        this.full_name              = data?.full_name              || "_";
        this.abbreviated_name       = data?.abbreviated_name       || ""; // +
        this.inn                    = data?.inn                    || null; // +
        this.kpp                    = data?.kpp                    || 0;

        this.illegal_address_index  = data?.illegal_address_index  || 123456;
        this.illegal_address_city   = data?.illegal_address_city   || "_";
        this.illegal_address_street = data?.illegal_address_street || "_";

        this.actual_address_index   = data?.actual_address_index   || 123456;
        this.actual_address_city    = data?.actual_address_city    || ""; // +
        this.actual_address_street  = data?.actual_address_street  || "_";
        // this.region  = data?.region  || "_"; REGION ???
        
        this.phone_number           = data?.phone_number           || 709185669889;
        this.email                  = data?.email                  || "test@test.com";
        this.director_full_name     = data?.director_full_name     || ""; // +
        this.director_position      = data?.director_position      || "_";
    }
  }
  