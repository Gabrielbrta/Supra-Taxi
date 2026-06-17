import { Component, inject, Inject, OnInit } from '@angular/core';
import { CardInfoComponent } from '../../shared/components/card-info/card-info-component';
import { CardComponent } from '../../shared/components/card/card.component';
import { ColumnType, PageResult, TableAction } from '../../shared/models/table/Table';
import { TableDataDocuments } from '../../shared/models/dashboard/TableDataDocuments';
import { TableComponent } from '../../shared/components/table/table.component';
import { StatusDocumento } from '../../shared/enums/StatusDocumentoEnum';
import { DashboardService } from '../../core/services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  imports: [CardInfoComponent, CardComponent, TableComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit{

  private readonly dashboardService = inject(DashboardService);

  ngOnInit() {
    this.getAllDocuments();
  }

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
      header: 'Status',
      type: 'status'
    }
  ]

  getAllDocuments() {
    // this.dashboardService.getAllDocuments().subscribe({
    //   next: result => {
    //     this.dataSource = result;
    //   },
    //   error: err => {
    //     console.error(err);
    //   }
    // })

    this.dataSource = this.dashboardService.getAll();
  }

  dataSource!: PageResult<TableDataDocuments>

   actions: TableAction[] = [
    // {
    //   icon: 'Pencil',
    //   action: 'edit',
    //   tooltip: 'Editar'
    // },
    // {
    //   icon: 'Trash2',
    //   action: 'delete',
    //   tooltip: 'Excluir'
    // },
    {
      icon: 'Eye',
      action: 'view',
      tooltip: 'Visualizar'
    },
    // {
    //   icon: 'KeyRound',
    //   action: 'view',
    //   tooltip: 'Alterar senha'
    // },
    // {
    //   icon: 'Printer',
    //   action: 'view',
    //   tooltip: 'Imprimir'
    // },
    // {
    //   icon: 'LockOpen',
    //   action: 'view',
    //   tooltip: 'Remover banimento'
    // },

  ]

  actionClick(event:{action:string,row:any}) {
    console.log(event.action);
    console.log(event.row);
  }

}
