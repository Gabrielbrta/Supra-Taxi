import { StatusEnum } from "../../enums/StatusEnum";

export interface TableDataDocuments {
    idMotorista: string | number;
    prefixo: string;
    nomeMotorista: string;
    telefoneMotorista: string;
    tipoMotorista: string;
    dataVencimento: Date;
    diasFaltantes: string | number,
    status: StatusEnum;
}