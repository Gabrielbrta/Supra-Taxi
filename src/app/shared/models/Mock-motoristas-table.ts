import { StatusEnum } from "../enums/StatusEnum";
import { DataSourceTableMotorista } from "./motoristas/dataSourceTableMotorista";
import { PageResult } from "./table/Table";

export const MOTORISTAS_TABLE: PageResult<DataSourceTableMotorista> = {
    data: [
        {
            id: 'asd1234-1234123',
            nomeMotorista: 'Carlos Eduardo Silva',
            cpf: '123.456.789-01',
            cnh: '12345678901',
            rct: '0042',
            telMotorista: '11987654321',
            status: StatusEnum.Ativo,
            cadastroMotorista: new Date('06-03-2024')
        },
        {
            id: 'asd1234-1234412',
            nomeMotorista: 'Pedro Henrique Souza',
            cpf: '23456789012',
            cnh: '23456789012',
            rct: '0118',
            telMotorista: '11976543210',
            status: StatusEnum.Ativo,
            cadastroMotorista: new Date('06-03-2024')
        },
        {
            id: 'asd143234-1234412',
            nomeMotorista: 'Roberto Almeida',
            cpf: '34567890123',
            cnh: '23456789012',
            rct: '0118',
            telMotorista: '11976543210',
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