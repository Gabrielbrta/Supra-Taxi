import { Moment } from "moment";
import { StatusEnum } from "../../enums/StatusEnum";

export interface DataSourceTableVistorias {
    id: string | number,
    unidade: string | number,
    veiculo: string,
    proprietario: string,
    diretor: string,
    dataVistoria: Moment | string | Date | null,
    situacao: StatusEnum,
}