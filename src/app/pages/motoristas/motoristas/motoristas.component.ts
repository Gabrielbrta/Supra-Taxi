import { Component, inject, OnInit } from '@angular/core';
import { DataSourceTableMotorista } from '../../../shared/models/motoristas/dataSourceTableMotorista';
import { ColumnType, PageResult, paginadora, TableAction } from '../../../shared/models/table/Table';
import { CardComponent } from "../../../shared/components/card/card.component";
import { TableComponent } from "../../../shared/components/table/table.component";
import { MotoristasService } from '../../../core/services/motoristas.service';
import { PageEvent } from '@angular/material/paginator';
import { SearchBarComponent } from "../../../shared/components/search-bar/search-bar.component";
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-motoristas',
  imports: [CardComponent, TableComponent, SearchBarComponent],
  templateUrl: './motoristas.component.html',
  styleUrl: './motoristas.component.scss',
})
export class MotoristasComponent implements OnInit {
  private readonly motoristaService = inject(MotoristasService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
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
        key: 'cpf',
        header: 'CPF',
        type: 'cpf'
      },
      {
        key: 'cnh',
        header: 'CNH',
        type: 'cnh'
      },
      {
        key: 'telMotorista',
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
        icon: 'LucideEye',
        action: 'view',
        tooltip: 'Visualizar'
      },
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

    onPage(page: PageEvent) {
      this.dataSource = this.motoristaService.getTableMotoristasPaginado(
        page.pageIndex + 1,
        page.pageSize
      )
    }

    getSearchValue(value: string) {
      console.log(value);
    }

    edit(row: any) {
      this.router.navigate(['/motoristas/editar', row.id]);
    }
    delete(row: any) {
      
    }
    view(row: any) {
      this.router.navigate(['/motoristas/visualizar', row.id]);

    }

    onActionClick(event: {action: string, row:any}) {
      console.log(event)
      if(event.action == 'edit') {
        this.edit(event.row);
      } 
      else if(event.action == 'delete') {
        this.delete(event.row);
      } 
      else if (event.action == 'view') {
        this.view(event.row);
      } 
      else {
        console.error('ação não existente');
      }
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
