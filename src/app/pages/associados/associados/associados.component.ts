import { Component, inject } from '@angular/core';
import { AssociadosService } from '../../../core/services/Associados.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DataSourceTableAssociados } from '../../../shared/models/associados/DataSourceTableAssociados';
import { ColumnType, PageResult, TableAction } from '../../../shared/models/table/Table';
import { PageEvent } from '@angular/material/paginator';
import { CardComponent } from '../../../shared/components/card/card.component';
import { TableComponent } from '../../../shared/components/table/table.component';
import { SearchBarComponent } from '../../../shared/components/search-bar/search-bar.component';
import { ModalComponent } from '../../../shared/components/modal/modal.component';

@Component({
  selector: 'app-associados',
  imports: [CardComponent, TableComponent, SearchBarComponent, ModalComponent],
  templateUrl: './associados.component.html',
  styleUrl: './associados.component.scss',
})
export class AssociadosComponent {
   private readonly associadosService = inject(AssociadosService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  dataSource!: PageResult<DataSourceTableAssociados>;
  openModal: boolean = false;
  nomeAssociado: string = '';
  idAssociado :string = '';
  tableColumns: ColumnType<DataSourceTableAssociados>[] =  [
      {
        key: 'id',
        header: 'ID',
      },
      {
        key: 'nomeAssociado',
        header: 'Nome',
        type: 'name'
      },
      {
        key: 'email',
        header: 'E-mail',
        type: 'text'
      },
      {
        key: 'unidades',
        header: 'Unidades',
      },
      {
        key: 'telAssociado',
        header: 'Telefone',
        type: 'tel'
      },
      {
        key: 'rct',
        header: 'RCT',
      },
      {
        key: 'status',
        header: 'Status',
        type: 'status'
      },
      {
        key: 'cadastroAssociado',
        header: 'Data cadastro',
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
      this.dataSource = this.associadosService.getTableAssociadosPaginado(
        page.pageIndex + 1,
        page.pageSize
      )
    }

    getSearchValue(value: string) {
      console.log(value);
    }

    edit(row: any) {
      this.router.navigate(['/associados/editar', row.id]);
    }
    delete(row: any) {
      this.openModal = true;
      this.nomeAssociado = row.nomeAssociado;
      this.idAssociado = row.id;
    }
    
    confirmDelete() {
      const result = this.associadosService.deleteAssociadoById(this.idAssociado);
      if(result) {
        this.getMotoristasPaginado();
        this.resetModalInfo();
      } else {
        this.resetModalInfo();
        console.error('Ocorreu um erro');
      }
    }
    view(row: any) {
      this.router.navigate(['/associados/visualizar', row.id]);

    }

    resetModalInfo() {
      this.idAssociado = '';
      this.closeModal();
    }

    onActionClick(event: {action: string, row:any}) {
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

    closeModal() {
      this.openModal = false;
    }

    cancel() {
      this.resetModalInfo();
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
      this.dataSource = this.associadosService.getTableAssociadosPaginado();
    }
}
