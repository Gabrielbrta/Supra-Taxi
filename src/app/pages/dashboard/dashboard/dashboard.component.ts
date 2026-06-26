import { Component, inject, Inject, OnInit } from '@angular/core';
import { CardInfoComponent } from '../../../shared/components/card-info/card-info-component';
import { CardComponent } from '../../../shared/components/card/card.component';
import { ColumnType, PageResult, TableAction } from '../../../shared/models/table/Table';
import { TableDataDocuments } from '../../../shared/models/dashboard/TableDataDocuments';
import { TableComponent } from '../../../shared/components/table/table.component';
import { DashboardService } from '../../../core/services/dashboard.service';
import { InfoCardsData } from '../../../shared/models/dashboard/InfoCardsData';
import { DashboardVistoriaData } from '../../../shared/models/dashboard/DashboardVistoriasQuery';
import { ListProfileComponent } from "../../../shared/components/list-profile/list-profile.component";
import { DashboardRegistersQuery } from '../../../shared/models/dashboard/DashboardRegistersQuery';

@Component({
  selector: 'app-dashboard',
  imports: [CardInfoComponent, CardComponent, TableComponent, ListProfileComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit{

  private readonly dashboardService = inject(DashboardService);
  dataSourceDocuments!: PageResult<TableDataDocuments>;
  dataSourceVistorias!: PageResult<DashboardVistoriaData>;
  dataSourceRegister!: PageResult<DashboardRegistersQuery>;
  infoCards!: InfoCardsData;

  ngOnInit() {
    this.getInfoCards();
    this.getAllDocuments();
    this.getAllRegisters();
    this.getAllVistorias();
  }

  tableDocumentColumns: ColumnType<TableDataDocuments>[] =  [
    {
      key: 'prefixo',
      header: 'Prefixo',
    },
    {
      key: 'nomeMotorista',
      header: 'Nome',
      type: 'name'
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
  tableVistoriasColumns: ColumnType<DashboardVistoriaData>[] =  [
    {
      key: 'prefixo',
      header: 'Prefixo',
    },
    {
      key: 'veiculo',
      header: 'Veículo'
    },
    {
      key: 'dataVistoria',
      header: 'Data',
      type: 'date'
    },
    {
      key: 'nomeDiretor',
      header: 'Diretor',
      type: 'name',
    },
    {
      key: 'status',
      header: 'Situação',
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

    this.dataSourceDocuments = this.dashboardService.getAllDocuments();
  }
  getAllVistorias() {
    // this.dashboardService.getAllVistorias().subscribe({
    //   next: result => {
    //     this.dataSource = result;
    //   },
    //   error: err => {
    //     console.error(err);
    //   }
    // })

    this.dataSourceVistorias = this.dashboardService.getAllVistorias();
  }
  getAllRegisters() {
    // this.dashboardService.getAllRegisters().subscribe({
    //   next: result => {
    //     this.dataSourceRegister = result;
    //   },
    //   error: err => {
    //     console.error(err);
    //   }
    // })

    this.dataSourceRegister = this.dashboardService.getAllRegisters();
  }
  getInfoCards() {
    // this.dashboardService.getInfoCards().subscribe({
    //   next: result => {
    //     this.infoCards = result;
    //   },
    //   error: err => {
    //     console.error(err);
    //   }
    // })

    this.infoCards = this.dashboardService.getInfoCards();
  }



   actions: TableAction[] = [
    // {
    //   icon: 'LucidePencil',
    //   action: 'edit',
    //   tooltip: 'Editar'
    // },
    // {
    //   icon: 'LucideTrash2',
    //   action: 'delete',
    //   tooltip: 'Excluir'
    // },
    {
      icon: 'LucideEye',
      action: 'view',
      tooltip: 'Visualizar'
    },
    // {
    //   icon: 'LucideKeyRound',
    //   action: 'view',
    //   tooltip: 'Alterar senha'
    // },
    // {
    //   icon: 'LucidePrinter',
    //   action: 'view',
    //   tooltip: 'Imprimir'
    // },
    // {
    //   icon: 'LucideLockOpen',
    //   action: 'view',
    //   tooltip: 'Remover banimento'
    // },

  ]

  actionClick(event:{action:string,row:any}) {
    console.log(event.action);
    console.log(event.row);
  }

}
