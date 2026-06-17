import { StatusDocumento } from "../enums/StatusDocumentoEnum";
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
        status: StatusDocumento.Critico
      },
      {
        idMotorista: Date.now() + 1,
        prefixo: 'A502',
        nomeMotorista: 'Pedrinho matador',
        telefoneMotorista: '(13) 99999-9999',
        tipoMotorista: 'Associado',
        dataVencimento: new Date('06-03-2024'),
        status: StatusDocumento.Aviso
      },
      {
        idMotorista: Date.now() + 2,
        prefixo: 'A502',
        nomeMotorista: 'Pedrinho matador',
        telefoneMotorista: '(13) 99999-9999',
        tipoMotorista: 'Associado',
        dataVencimento: new Date('06-03-2024'),
        status: StatusDocumento.VencimentoProximo
      },
      {
        idMotorista: Date.now() + 3,
        prefixo: 'A502',
        nomeMotorista: 'Pedrinho matador',
        telefoneMotorista: '(13) 99999-9999',
        tipoMotorista: 'Associado',
        dataVencimento: new Date('06-03-2024'),
        status: StatusDocumento.Regular
      }
    ],

    paginadora: {
        pageNumber: 1,
        pageSize: 10,
        totalPages: 1,
        totalCount: 4
    }
}