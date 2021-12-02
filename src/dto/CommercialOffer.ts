export default class CommercialOffer {
  id: number;
  // title: Номер
  // readOnly: true
  create_date: string;
  // title: Дата
  // readOnly: true
  discount: number;
  // title: Скидка
  // maximum: 2147483647
  // minimum: -2147483648
  exploration_date: string;
  // title: Срок действия
  // x-nullable: true
  supply_terms: string;
  // title: Условия поставки
  // maxLength: 256
  // x-nullable: true
  execution_date: string;
  // title: Срок исполнения
  // x-nullable: true
  was_send: boolean;
  // title: Отправлено
  send_datetime: string;
  // title: Дата и время отправки
  // x-nullable: true
  tech_docs_format: string;
  // title: Формат технической документации
  // Enum:
  // Array [ 2 ]
  counterparty: number;
  // title: Counterparty
  // x-nullable: true
  contact_person: number;
  // title: Contact person
  // x-nullable: true
  company: number;
  // title: Company
  // products: Array<number>;
  products: any;
  // uniqueItems: true
  // number]
  constructor(data: any) {
    this.id               = data?.id               || null;
    this.create_date      = data?.create_date      || '';
    this.discount         = data?.discount         || null;
    this.exploration_date = data?.exploration_date || '';
    this.supply_terms     = data?.supply_terms     || null;
    this.execution_date   = data?.execution_date   || null;
    this.was_send         = data?.was_send         || null;
    this.send_datetime    = data?.send_datetime    || null;
    this.tech_docs_format = data?.tech_docs_format || null;
    this.counterparty     = data?.counterparty     || null;
    this.contact_person   = data?.contact_person   || null;
    this.company          = data?.company          || null;
    this.products         = data?.products         || [];
  }
}
