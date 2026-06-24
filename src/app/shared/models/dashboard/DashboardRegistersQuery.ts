import { TipoMotoristaEnum } from "../../enums/TipoMotoristaEnum";

export interface DashboardRegistersQuery  {
    id: string;
    name: string,
    tipoMotorista: TipoMotoristaEnum,
    dataCadastro: Date
}