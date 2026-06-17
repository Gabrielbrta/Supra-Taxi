import { StatusDocumento } from "../../enums/StatusDocumentoEnum";

export interface TableDataDocuments {
    idMotorista: string | number;
    prefixo: string;
    nomeMotorista: string;
    telefoneMotorista: string;
    tipoMotorista: string;
    dataVencimento: Date;
    status: StatusDocumento;
}