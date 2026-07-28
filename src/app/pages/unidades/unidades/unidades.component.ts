import { Component, inject } from '@angular/core';
import { UnidadesService } from '../../../core/services/Unidades.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ColumnType, PageResult, TableAction } from '../../../shared/models/table/Table';
import { CadastroUnidadesDTO } from '../../../shared/models/unidades/CadastroUnidadesDTO';
import { PageEvent } from '@angular/material/paginator';
import { CardComponent } from '../../../shared/components/card/card.component';
import { TableComponent } from '../../../shared/components/table/table.component';
import { SearchBarComponent } from '../../../shared/components/search-bar/search-bar.component';
import { ModalComponent } from '../../../shared/components/modal/modal.component';

@Component({
  selector: 'app-unidades',
  imports: [CardComponent, TableComponent, SearchBarComponent, ModalComponent],
  templateUrl: './unidades.component.html',
  styleUrl: './unidades.component.scss',
})
export class UnidadesComponent {
  private readonly unidadesService = inject(UnidadesService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  dataSource!: PageResult<CadastroUnidadesDTO>;
  openModal: boolean = false;
  unidade : string = '';
  private idUnidade : string = '';
  tableColumns: ColumnType<CadastroUnidadesDTO>[] =  [
      {
        key: 'id',
        header: 'ID',
      },
      {
        key: 'prefixo',
        header: 'Prefixo',
        type: 'name'
      },
      {
        key: 'unidade',
        header: 'Unidade',
        type: 'text'
      },
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
      }
        // {
        //   icon: 'LucideKeyRound',
        //   action: 'view',
        //   tooltip: 'Alterar senha'
        // },
        // {
        //   icon: 'LucideLockOpen',
        //   action: 'view',
        //   tooltip: 'Remover banimento'
        // },
    
      ]

    ngOnInit() {
      this.getUnidadesPaginado();
    }

    onPage(page: PageEvent) {
      this.dataSource = this.unidadesService.getTableUnidadesPaginado(
        page.pageIndex + 1,
        page.pageSize
      )
    }

    getSearchValue(value: string) {
      console.log(value);
    }

    edit(row: any) {
      this.router.navigate(['/unidades/editar', row.id]);
    }
    delete(row: any) {
      this.openModal = true;
      this.unidade = row.prefixo + row.unidade;
      this.idUnidade = row.id;
    }
    
    confirmDelete() {
      const result = this.unidadesService.deleteVistoriaById(this.idUnidade);
      if(result) {
        this.getUnidadesPaginado();
        this.resetModalInfo();
      } else {
        this.resetModalInfo();
        console.error('Ocorreu um erro');
      }
    }
    view(row: any) {
      this.router.navigate(['/unidades/visualizar', row.id]);

    }

    resetModalInfo() {
      this.idUnidade = '';
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

    getUnidadesPaginado() {
      // this.getVistoriasPaginado().subscribe({
      //   next: result => {
      //     if(result.data?.length) {
      //       this.dataSource = result.data;
      //     }
      //   },
      //   error: error => {
      //     console.error(error)
      //   }
      // })
      this.dataSource = this.unidadesService.getTableUnidadesPaginado();
    }

}
