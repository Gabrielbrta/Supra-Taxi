import { StatusEnum } from "../../enums/StatusEnum";

export interface DashboardVistoriaData {
    id: string | number,
    prefixo: string,
    veiculo: string,
    dataVistoria: Date,
    nomeDiretor: string,
    status: StatusEnum

}