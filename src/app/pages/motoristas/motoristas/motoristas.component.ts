import { Component, inject, OnInit } from '@angular/core';
import { DataSourceTableMotorista } from '../../../shared/models/motoristas/dataSourceTableMotorista';
import { ColumnType, PageResult, TableAction } from '../../../shared/models/table/Table';
import { CardComponent } from "../../../shared/components/card/card.component";
import { TableComponent } from "../../../shared/components/table/table.component";
import { MotoristasService } from '../../../core/services/motoristas.service';

@Component({
  selector: 'app-motoristas',
  imports: [CardComponent, TableComponent],
  templateUrl: './motoristas.component.html',
  styleUrl: './motoristas.component.scss',
})
export class MotoristasComponent implements OnInit {
  private readonly motoristaService = inject(MotoristasService);
  dataSource!: PageResult<DataSourceTableMotorista>;
  tableColumns: ColumnType<DataSourceTableMotorista>[] =  [
      {
        key: 'id',
        header: 'ID',
      },
      {
        key: 'nomeMotorista',
        header: 'Nome',
        type: 'name'
      },
      {
        key: 'cpfMotorista',
        header: 'CPF',
        type: 'cpf'
      },
      {
        key: 'cnhMotorista',
        header: 'CNH',
        type: 'cnh'
      },
      {
        key: 'telefoneMotorista',
        header: 'Telefone',
        type: 'tel'
      },
      {
        key: 'status',
        header: 'Status',
        type: 'status'
      },
      {
        key: 'cadastroMotorista',
        header: 'Cadastro',
        type: 'date'
      }
    ]

    actions: TableAction[] = [
        {
          icon: 'LucidePencil',
          action: 'edit',
          tooltip: 'Editar'
        },
        {
          icon: 'LucideTrash2',
          action: 'delete',
          tooltip: 'Excluir'
        },
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

    ngOnInit() {
      this.getMotoristasPaginado();
    }

    getMotoristasPaginado() {
      // this.getMotoristasPaginado().subscribe({
      //   next: result => {
      //     if(result.data?.length) {
      //       this.dataSource = result.data;
      //     }
      //   },
      //   error: error => {
      //     console.error(error)
      //   }
      // })
      this.dataSource = this.motoristaService.getTableMotoristasPaginado();
    }
}
