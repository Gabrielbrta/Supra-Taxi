import { StatusEnum } from "../enums/StatusEnum";
import { TableDataDocuments } from "./dashboard/TableDataDocuments";
import { PageResult } from "./table/Table";


export const MOCK_DOCUMENTS: PageResult<TableDataDocuments> = {
        data: [
      {
        idMotorista: Date.now(),
        prefixo: 'A502',
        nomeMotorista: 'Pedrinho matador',
        telefoneMotorista: '(13) 99999-9999',
        tipoMotorista: 'Associado',
        dataVencimento: new Date('06-03-2024'),
        diasFaltantes: '0',
        status: StatusEnum.Critico
      },
      {
        idMotorista: Date.now() + 1,
        prefixo: 'A502',
        nomeMotorista: 'Pedrinho matador',
        telefoneMotorista: '(13) 99999-9999',
        tipoMotorista: 'Associado',
        dataVencimento: new Date('06-03-2024'),
        diasFaltantes: '15',
        status: StatusEnum.Pendente
      },
      {
        idMotorista: Date.now() + 2,
        prefixo: 'A502',
        nomeMotorista: 'Pedrinho matador',
        telefoneMotorista: '(13) 99999-9999',
        tipoMotorista: 'Associado',
        dataVencimento: new Date('06-03-2024'),
        diasFaltantes: '5',
        status: StatusEnum.Reprovado
      },
      {
        idMotorista: Date.now() + 3,
        prefixo: 'A502',
        nomeMotorista: 'Pedrinho matador',
        telefoneMotorista: '(13) 99999-9999',
        tipoMotorista: 'Associado',
        dataVencimento: new Date('06-03-2024'),
        diasFaltantes: '45',
        status: StatusEnum.Aprovado
      }
    ],

    paginadora: {
      pageSize: 5,
      pageNumber: 3,
      totalPages: 5,
      totalCount: 20,
      hasNextPage: true,
      hasPreviousPage: false
    }
}