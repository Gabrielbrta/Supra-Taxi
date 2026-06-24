import { StatusEnum } from "../../enums/StatusEnum";

export interface DataSourceTableMotorista {
    id: string | number,
    nomeMotorista: string,
    cpfMotorista: string,
    cnhMotorista: string,
    rctMotorista: string,
    telefoneMotorista: string,
    status: StatusEnum,
    cadastroMotorista: Date
}