import { Component, inject } from '@angular/core';
import { CardComponent } from '../../../shared/components/card/card.component';
import { TableComponent } from '../../../shared/components/table/table.component';
import { SearchBarComponent } from '../../../shared/components/search-bar/search-bar.component';
import { ModalComponent } from '../../../shared/components/modal/modal.component';
import { BanidosService } from '../../../core/services/Banidos.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ColumnType, PageResult, TableAction } from '../../../shared/models/table/Table';
import { CadastroBanidosDTO } from '../../../shared/models/banidos/CadastroBanidosDTO';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-banidos',
  imports: [CardComponent, TableComponent, SearchBarComponent, ModalComponent],
  templateUrl: './banidos.component.html',
  styleUrl: './banidos.component.scss',
})
export class BanidosComponent {
    private readonly banidosService = inject(BanidosService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  dataSource!: PageResult<CadastroBanidosDTO>;
  openModal: boolean = false;
  banido : string = '';
  private idBanimento : string = '';
  tableColumns: ColumnType<CadastroBanidosDTO>[] =  [
      {
        key: 'id',
        header: 'ID',
      },
      {
        key: 'nome',
        header: 'Motorista / Proprietário',
        type: 'name'
      },
      {
        key: 'rg',
        header: 'RG',
        type: 'text'
      },
      {
        key: 'cpf',
        header: 'CPF',
        type: 'text'
      },
      {
        key: 'dataBanimento',
        header: 'Data do banimento',
        type: 'date'
      },
      {
        key: 'motivoBanimento',
        header: 'Motivo Banimento',
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
      // {
      //   icon: 'LucideTrash2',
      //   action: 'delete',
      //   tooltip: 'Excluir'
      // }
        // {
        //   icon: 'LucideKeyRound',
        //   action: 'view',
        //   tooltip: 'Alterar senha'
        // },
        {
          icon: 'LucideLockOpen',
          action: 'view',
          tooltip: 'Remover banimento'
        },
    
      ]

    ngOnInit() {
      this.getBanimentosPaginado();
    }

    onPage(page: PageEvent) {
      this.dataSource = this.banidosService.getTableBanimentosPaginado(
        page.pageIndex + 1,
        page.pageSize
      )
    }

    getSearchValue(value: string) {
      console.log(value);
    }

    edit(row: any) {
      this.router.navigate(['/banidos/editar', row.id]);
    }
    delete(row: any) {
      this.openModal = true;
      this.banido = row.nome;
      this.idBanimento = row.id;
    }
    
    confirmDelete() {
      const result = this.banidosService.deleteBanimentoById(this.idBanimento);
      if(result) {
        this.getBanimentosPaginado();
        this.resetModalInfo();
      } else {
        this.resetModalInfo();
        console.error('Ocorreu um erro');
      }
    }
    view(row: any) {
      this.router.navigate(['/banidos/visualizar', row.id]);

    }

    resetModalInfo() {
      this.idBanimento = '';
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

    getBanimentosPaginado() {
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
      this.dataSource = this.banidosService.getTableBanimentosPaginado();
    }
}
