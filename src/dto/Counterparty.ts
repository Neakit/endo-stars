export default class Counterparty {
    // title: Id
    // readOnly: true
    id:	number;
    // title: Полное наименование
    // maxLength: 128
    // minLength: 1
    // required
    full_name:	string;
    
    // title: Сокращённое наименование
    // maxLength: 100
    // minLength: 1
    // required
    abbreviated_name:	string;
    
    // title: ИНН
    // maximum: 9223372036854776000
    // minimum: 0
    // required
    inn: number;
    
    // title: КПП
    // maximum: 9223372036854776000
    // minimum: 0
    // required
    kpp: number;
    
    // title: Индекс юр адреса
    // maximum: 2147483647
    // minimum: 0
    // required
    illegal_address_index: number;

    illegal_address_city:	string;
    // title: Город юр адреса
    // maxLength: 64
    // minLength: 1

    illegal_address_street: string;
    // title: Юридический адрес
    // maxLength: 256
    // minLength: 1

    actual_address_index:	number;
    // title: Фактический индекс
    // maximum: 2147483647
    // minimum: 0

    actual_address_city: string;
    // title: Фактический город
    // maxLength: 64
    // minLength: 1

    actual_address_street: string;
    // title: Фактический адрес
    // maxLength: 256
    // minLength: 1

    phone_number: number;
    // title: Номер телефона
    // maximum: 9223372036854776000
    // minimum: 0

    email: string;
    // title: Электронная почта
    // maxLength: 254
    // minLength: 1

    bank_name:	string;
    // title: Наименование банка
    // maxLength: 128
    // minLength: 1

    bank_bik: number;
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

    director_full_name:	string;
    // title: ФИО руководителя
    // maxLength: 128
    // minLength: 1

    director_position:	string;
    // title: Должность руководителя
    // maxLength: 64
    // minLength: 1

    discount:	number;
    // title: Скидка
    // maximum: 2147483647
    // minimum: -2147483648
    
    lpu:	number;
    // title: Lpu
    // x-nullable: true
    
    constructor(data: any) {
      this.id                     = data?.id                     || null ;
      this.full_name              = data?.full_name              || "_" ;
      this.abbreviated_name       = data?.abbreviated_name       || "ДОРН Медицина" ; // +
      this.inn                    = data?.inn                    || 12345678 ; // +
      this.kpp                    = data?.kpp                    || 0 ;

      this.illegal_address_index  = data?.illegal_address_index  || 0 ;
      this.illegal_address_city   = data?.illegal_address_city   || "_" ;
      this.illegal_address_street = data?.illegal_address_street || "ул. Кукушкина" ; // +
      this.actual_address_index   = data?.actual_address_index   || 0 ;
      this.actual_address_city    = data?.actual_address_city    || "_" ;
      this.actual_address_street  = data?.actual_address_street  || "_" ;

      this.phone_number           = data?.phone_number           || 9185669889 ; // +
      this.email                  = data?.email                  || "pavliukny@gmail.com" ; // +
      this.bank_name              = data?.bank_name              || "_" ;
      this.bank_bik               = data?.bank_bik               || 0 ;
      this.payment_account        = data?.payment_account        || 0 ;
      this.correspondent_account  = data?.correspondent_account  || 0 ;

      this.director_full_name     = data?.director_full_name     || "Иванов Иван Ивановчи" ; // +
      this.director_position      = data?.director_position      || "_" ;
      this.discount               = data?.discount               || 50 ; // +
      this.lpu                    = data?.lpu                    || 123 ;
    }
  }
  