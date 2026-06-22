import { Component, inject, Inject, OnInit } from '@angular/core';
import { CardInfoComponent } from '../../shared/components/card-info/card-info-component';
import { CardComponent } from '../../shared/components/card/card.component';
import { ColumnType, PageResult, TableAction } from '../../shared/models/table/Table';
import { TableDataDocuments } from '../../shared/models/dashboard/TableDataDocuments';
import { TableComponent } from '../../shared/components/table/table.component';
import { DashboardService } from '../../core/services/dashboard.service';
import { InfoCardsData } from '../../shared/models/dashboard/InfoCardsData';
import { DashboardVistoriaData } from '../../shared/models/dashboard/DashboardVistoriasQuery';
import { ProfileImageComponent } from "../../shared/components/profile-image/profile-image.component";
import { ListProfileComponent } from "../../shared/components/list-profile/list-profile.component";
import { DashboardRegistersQuery } from '../../shared/models/dashboard/DashboardRegistersQuery';
import { TipoMotoristaEnum } from '../../shared/enums/TipoMotoristaEnum';

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
  infoCards!: InfoCardsData;

  ngOnInit() {
    this.getInfoCards();
    this.getAllDocuments();
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

  dataSourceRegister: PageResult<DashboardRegistersQuery> = {
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
