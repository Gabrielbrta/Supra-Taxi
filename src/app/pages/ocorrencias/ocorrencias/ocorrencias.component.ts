import { Component, inject } from '@angular/core';
import { CardComponent } from '../../../shared/components/card/card.component';
import { TableComponent } from '../../../shared/components/table/table.component';
import { SearchBarComponent } from '../../../shared/components/search-bar/search-bar.component';
import { ModalComponent } from '../../../shared/components/modal/modal.component';
import { OcorrenciasService } from '../../../core/services/Ocorrencias.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ColumnType, PageResult, TableAction } from '../../../shared/models/table/Table';
import { CadastroOcorrenciasDTO } from '../../../shared/models/ocorrencias/CadastroOcorrenciasDTO';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-ocorrencias',
  imports: [CardComponent, TableComponent, SearchBarComponent, ModalComponent],
  templateUrl: './ocorrencias.component.html',
  styleUrl: './ocorrencias.component.scss',
})
export class OcorrenciasComponent {
   private readonly ocorrenciasService = inject(OcorrenciasService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  dataSource!: PageResult<CadastroOcorrenciasDTO>;
  openModal: boolean = false;
  ocorrencia : string = '';
  private idOcorrencia : string = '';
  tableColumns: ColumnType<CadastroOcorrenciasDTO>[] =  [
      {
        key: 'id',
        header: 'ID',
      },
      {
        key: 'usuario',
        header: 'Diretor',
        type: 'name'
      },
      {
        key: 'unidade',
        header: 'Unidade',
        type: 'text'
      },
      {
        key: 'descricao',
        header: 'Descricao',
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
      this.getOcorrenciasPaginado();
    }

    onPage(page: PageEvent) {
      this.dataSource = this.ocorrenciasService.getTableOcorrenciasPaginado(
        page.pageIndex + 1,
        page.pageSize
      )
    }

    getSearchValue(value: string) {
      console.log(value);
    }

    edit(row: any) {
      this.router.navigate(['/ocorrencias/editar', row.id]);
    }
    delete(row: any) {
      this.openModal = true;
      this.ocorrencia = row.unidade;
      this.idOcorrencia = row.id;
    }
    
    confirmDelete() {
      const result = this.ocorrenciasService.deleteOcorrenciaById(this.idOcorrencia);
      if(result) {
        this.getOcorrenciasPaginado();
        this.resetModalInfo();
      } else {
        this.resetModalInfo();
        console.error('Ocorreu um erro');
      }
    }
    view(row: any) {
      this.router.navigate(['/ocorrencias/visualizar', row.id]);

    }

    resetModalInfo() {
      this.idOcorrencia = '';
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

    getOcorrenciasPaginado() {
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
      this.dataSource = this.ocorrenciasService.getTableOcorrenciasPaginado();
    }
}
