import { StatusEnum } from "../enums/StatusEnum";
import { DashboardVistoriaData } from "./dashboard/DashboardVistoriasQuery";
import { InfoCardsData } from "./dashboard/InfoCardsData";
import { PageResult } from "./table/Table";

export const DASHBOARD_VISTORIAS: PageResult<DashboardVistoriaData> =  {
    data: [
        {
                id: Date.now(),
                prefixo: 'A502',
                veiculo: 'Toyota Corolla 2022',
                dataVistoria:  new Date('06-03-2024'),
                nomeDiretor: 'Eduardo Ramos',
                status: StatusEnum.Aprovado
        },
        {
            id: Date.now() + 1,
            prefixo: 'A603',
            veiculo: 'Hyundai HB20 2021',
            dataVistoria:  new Date('06-03-2024'),
            nomeDiretor: 'Patrícia Almeida',
            status: StatusEnum.Reprovado
        },
        {
            id: Date.now() + 2,
            prefixo: 'A551',
            veiculo: 'Chevrolet Onix 2023',
            dataVistoria:  new Date('06-03-2024'),
            nomeDiretor: 'Marina Castro',
            status: StatusEnum.Pendente
        },
        {
            id: Date.now() + 3,
            prefixo: 'A524',
            veiculo: 'Fiat Cronos 2020',
            dataVistoria:  new Date('06-03-2024'),
            nomeDiretor: 'Eduardo Ramos',
            status: StatusEnum.Reprovado
        }
       
    ]
}