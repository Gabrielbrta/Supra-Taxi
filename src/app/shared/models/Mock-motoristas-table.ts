import { StatusEnum } from "../enums/StatusEnum";
import { DataSourceTableMotorista } from "./motoristas/dataSourceTableMotorista";
import { PageResult } from "./table/Table";

export const MOTORISTAS_TABLE: PageResult<DataSourceTableMotorista> = {
    data: [
        {
            id: 'asd1234-1234123',
            nomeMotorista: 'Carlos Eduardo Silva',
            cpfMotorista: '123.456.789-01',
            cnhMotorista: '12345678901',
            rctMotorista: '0042',
            telefoneMotorista: '11987654321',
            status: StatusEnum.Ativo,
            cadastroMotorista: new Date('06-03-2024')
        },
        {
            id: 'asd1234-1234412',
            nomeMotorista: 'Pedro Henrique Souza',
            cpfMotorista: '23456789012',
            cnhMotorista: '23456789012',
            rctMotorista: '0118',
            telefoneMotorista: '11976543210',
            status: StatusEnum.Ativo,
            cadastroMotorista: new Date('06-03-2024')
        },
        {
            id: 'asd143234-1234412',
            nomeMotorista: 'Roberto Almeida',
            cpfMotorista: '34567890123',
            cnhMotorista: '23456789012',
            rctMotorista: '0118',
            telefoneMotorista: '11976543210',
            status: StatusEnum.Inativo,
            cadastroMotorista: new Date('06-03-2024')
        }

    ],
    paginadora: {
      pageSize: 10,
      pageNumber: 1,
      totalPages: 5,
      totalCount: 20,
      hasNextPage: true,
      hasPreviousPage: false
    }
    
}