import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VistoriaService } from '../../../core/services/Vistorias.service';
import { ColumnType, PageResult, TableAction } from '../../../shared/models/table/Table';
import { PageEvent } from '@angular/material/paginator';
import { DataSourceTableVistorias } from '../../../shared/models/vistorias/DataSourceTableVistorias';
import { CardComponent } from '../../../shared/components/card/card.component';
import { TableComponent } from '../../../shared/components/table/table.component';
import { SearchBarComponent } from '../../../shared/components/search-bar/search-bar.component';
import { ModalComponent } from '../../../shared/components/modal/modal.component';

@Component({
  selector: 'app-vistorias',
  imports: [CardComponent, TableComponent, SearchBarComponent, ModalComponent],
  templateUrl: './vistorias.component.html',
  styleUrl: './vistorias.component.scss',
})
export class VistoriasComponent {
     private readonly vistoriasService = inject(VistoriaService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  dataSource!: PageResult<DataSourceTableVistorias>;
  openModal: boolean = false;
  unidade : string = '';
  private idVistoria : string = '';
  tableColumns: ColumnType<DataSourceTableVistorias>[] =  [
    /*
        situacao: StatusEnum,
    */
      {
        key: 'id',
        header: 'ID',
      },
      {
        key: 'unidade',
        header: 'Unidade',
        type: 'text'
      },
      {
        key: 'veiculo',
        header: 'Veículo',
        type: 'name'
      },
      {
        key: 'proprietario',
        header: 'Proprietário',
      },
      {
        key: 'diretor',
        header: 'Diretor',
        type: 'text'
      },
      {
        key: 'dataVistoria',
        header: 'Data da vistoria',
        type: 'date'
      },
      {
        key: 'situacao',
        header: 'Situação',
        type: 'status'
      },
    ]

    actions: TableAction[] = [
      {
        icon: 'LucidePrinter',
        action: 'view',
        tooltip: 'Imprimir'
      },
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
      this.getVistoriasPaginado();
    }

    onPage(page: PageEvent) {
      this.dataSource = this.vistoriasService.getTableVistoriaPaginado(
        page.pageIndex + 1,
        page.pageSize
      )
    }

    getSearchValue(value: string) {
      console.log(value);
    }

    edit(row: any) {
      this.router.navigate(['/vistorias/editar', row.id]);
    }
    delete(row: any) {
      this.openModal = true;
      this.unidade = row.unidade;
      this.idVistoria = row.id;
    }
    
    confirmDelete() {
      const result = this.vistoriasService.deleteVistoriaById(this.idVistoria);
      if(result) {
        this.getVistoriasPaginado();
        this.resetModalInfo();
      } else {
        this.resetModalInfo();
        console.error('Ocorreu um erro');
      }
    }
    view(row: any) {
      this.router.navigate(['/vistorias/visualizar', row.id]);

    }

    resetModalInfo() {
      this.idVistoria = '';
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

    getVistoriasPaginado() {
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
      this.dataSource = this.vistoriasService.getTableVistoriaPaginado();
    }

}
