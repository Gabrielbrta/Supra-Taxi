import { TipoMotoristaEnum } from "../enums/TipoMotoristaEnum";
import { DashboardRegistersQuery } from "./dashboard/DashboardRegistersQuery";
import { PageResult } from "./table/Table";

export const DASHBOARD_REGISTERS: PageResult<DashboardRegistersQuery> = {
    data: [
        {
            id: 'asdlkjas-dalskdjas-oiepqowie',
            name: 'Gabriel Correa Amparo Pedroso',
            tipoMotorista: TipoMotoristaEnum.Motorista,
            dataCadastro: new Date('08-05-2010')
        },
        {
            id: 'asdlkjas-dalskdjas-oiepqasde',
            name: 'Mariana Santos Americo',
            tipoMotorista: TipoMotoristaEnum.Associado,
            dataCadastro: new Date('06-03-2005')
        },
        {
            id: 'asdlkjas-asdadwqwe-oiepqowie',
            name: 'Pedrinho Pai De Pet',
            tipoMotorista: TipoMotoristaEnum.Motorista,
            dataCadastro: new Date('08-11-2007')
        }
    ] 
}