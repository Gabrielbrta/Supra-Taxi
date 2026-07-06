import { StatusEnum } from "../../enums/StatusEnum";

export interface DataSourceTableMotorista {
    id: string | number,
    nomeMotorista: string,
    cpf: string,
    cnh: string,
    rct: string,
    telMotorista: string,
    status: StatusEnum,
    cadastroMotorista: Date
}