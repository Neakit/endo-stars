export default class PermitDocument {
    id: number;
    // title: Id
    // readOnly: true
    name: string;
    // title: Название
    // maxLength: 64
    // x-nullable: true
    serial: string;
    // title: Серия
    // maxLength: 64
    // x-nullable: true
    number:	string;
    // title: Номер
    // maxLength: 64
    // x-nullable: true
    date: string;
    // title: Дата
    // x-nullable: true
    description: string;
    // title: Описание
    // x-nullable: true
    file: string;
    // title: Файл
    // readOnly: true
    exp_date: string;
    // title: Срок действия
    // x-nullable: true
    products;

    constructor(data: any) {
        this.id          = data?.id          || null;
        this.name        = data?.name        || null;
        this.serial      = data?.serial      || null;
        this.number      = data?.number      || null;
        this.date        = data?.date        || null;
        this.description = data?.description || null;
        this.file        = data?.file        || null;
        this.exp_date    = data?.exp_date    || null;
        this.products    = data?.products    || null;
    }
  }
  