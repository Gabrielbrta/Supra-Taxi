import { StatusEnum } from "../../enums/StatusEnum";

export interface DataSourceTableAssociados {
    id: string | number,
    nomeAssociado: string,
    email: string,
    unidades: string,
    rct: string,
    veiculos: number | string,
    telAssociado: string,
    status: StatusEnum,
    cadastroAssociado: Date
}