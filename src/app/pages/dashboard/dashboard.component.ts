import { Component } from '@angular/core';
import { CardInfoComponent } from '../../shared/components/card-info/card-info-component';
import { Icons } from '../../shared/icons/icons';
import { CardComponent } from '../../shared/components/card/card.component';
import { ColumnType, PageResult, TableAction } from '../../shared/models/table/Table';
import { TableDataDocuments } from '../../shared/models/dashboard/TableDataDocuments';
import { TableComponent } from '../../shared/components/table/table.component';

@Component({
  selector: 'app-dashboard',
  imports: [CardInfoComponent, CardComponent, TableComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  tableColumns: ColumnType<TableDataDocuments>[] =  [
    {
      key: 'prefixo',
      header: 'Prefixo',
    },
    {
      key: 'nomeMotorista',
      header: 'Nome'
    },
    {
      key: 'telefoneMotorista',
      header: 'Telefone'
    },
    {
      key: 'tipoMotorista',
      header: 'Tipo'
    },
    {
      key: 'dataVencimento',
      header: 'Vencimento',
      type: 'date'
    },
    {
      key: 'status',
      header: 'Status'
    }
  ]

  dataSource: PageResult<TableDataDocuments> = {
    data: [
      {
        idMotorista: 'asdlkajd-23adaskj-32123',
        prefixo: 'A502',
        nomeMotorista: 'Pedrinho matador',
        telefoneMotorista: '(13) 99999-9999',
        tipoMotorista: 'Associado',
        dataVencimento: new Date('06-03-2024'),
        status: 'Vencido'
      },
      {
        idMotorista: 'asdlkajd-23adaskj-32123',
        prefixo: 'A502',
        nomeMotorista: 'Pedrinho matador',
        telefoneMotorista: '(13) 99999-9999',
        tipoMotorista: 'Associado',
        dataVencimento: new Date('06-03-2024'),
        status: 'Vencido'
      },
      {
        idMotorista: 'asdlkajd-23adaskj-32123',
        prefixo: 'A502',
        nomeMotorista: 'Pedrinho matador',
        telefoneMotorista: '(13) 99999-9999',
        tipoMotorista: 'Associado',
        dataVencimento: new Date('06-03-2024'),
        status: 'Vencido'
      }
    ],
  }


   actions: TableAction[] = [
    //  {
    //    icon: 'add',
    //    action: 'create',
    //    tooltip: 'Cadastrar'
    //  },
    {
      icon: 'Pencil',
      action: 'edit',
      tooltip: 'Editar'
    },
    // {
    //   icon: 'delete',
    //   action: 'delete',
    //   tooltip: 'Excluir'
    // },
    {
      icon: 'Eye',
      action: 'view',
      tooltip: 'Visualizar'
    }
    // {
    //   icon: 'key',
    //   action: 'key',
    //   tooltip: 'Alterar senha'
    // },
    // {
    //   icon: 'print',
    //   action: 'print',
    //   tooltip: 'Imprimir'
    // },
    // {
    //   icon: 'unlock',
    //   action: 'unlock',
    //   tooltip: 'Remover banimento'
    // },

  ]

  actionClick(event:{action:string,row:any}) {
    console.log(event.action);
    console.log(event.row);
  }

}
