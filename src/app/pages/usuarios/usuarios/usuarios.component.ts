import { Component, inject } from '@angular/core';
import { CardComponent } from '../../../shared/components/card/card.component';
import { TableComponent } from '../../../shared/components/table/table.component';
import { SearchBarComponent } from '../../../shared/components/search-bar/search-bar.component';
import { ModalComponent } from '../../../shared/components/modal/modal.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ColumnType, PageResult, TableAction } from '../../../shared/models/table/Table';
import { PageEvent } from '@angular/material/paginator';
import { UsuarioService } from '../../../core/services/Usuarios.service';
import { CadastroUsuarioDTO } from '../../../shared/models/usuarios/CadastroUsuarioDTO';

@Component({
  selector: 'app-usuarios',
  imports: [CardComponent, TableComponent, SearchBarComponent, ModalComponent],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.scss',
})
export class UsuariosComponent {
   private readonly usuariosService = inject(UsuarioService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  dataSource!: PageResult<CadastroUsuarioDTO>;
  openModal: boolean = false;
  ocorrencia : string = '';
  private idOcorrencia : string = '';
  tableColumns: ColumnType<CadastroUsuarioDTO>[] =  [
      {
        key: 'id',
        header: 'ID',
      },
      {
        key: 'nome',
        header: 'Nome',
        type: 'name'
      },
      {
        key: 'tipoUsuario',
        header: 'Cargo',
      },
      {
        key: 'status',
        header: 'Situação',
        type: 'status'
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
        icon: 'LucideKeyRound',
        action: 'password',
        tooltip: 'Resetar senha'
      },
      {
        icon: 'LucideTrash2',
        action: 'delete',
        tooltip: 'Excluir'
      },
        // {
        //   icon: 'LucideLockOpen',
        //   action: 'view',
        //   tooltip: 'Remover banimento'
        // },
    
      ]

    ngOnInit() {
      this.getUsuarioPaginado();
    }

    onPage(page: PageEvent) {
      this.dataSource = this.usuariosService.getTableUsuarioPaginado(
        page.pageIndex + 1,
        page.pageSize
      )
    }

    getSearchValue(value: string) {
      console.log(value);
    }

    edit(row: any) {
      this.router.navigate(['/usuarios/editar', row.id]);
    }
    delete(row: any) {
      this.openModal = true;
      this.ocorrencia = row.unidade;
      this.idOcorrencia = row.id;
    }
    resetPassoword(row: any) {
      this.openModal = true;
      this.ocorrencia = row.nome;
      this.idOcorrencia = row.id;
    }
    
    confirmDelete() {
      const result = this.usuariosService.deleteUsuarioById(this.idOcorrencia);
      if(result) {
        this.getUsuarioPaginado();
        this.resetModalInfo();
      } else {
        this.resetModalInfo();
        console.error('Ocorreu um erro');
      }
    }
    view(row: any) {
      this.router.navigate(['/usuarios/visualizar', row.id]);

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
      else if(event.action == 'password') {
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

    getUsuarioPaginado() {
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
      this.dataSource = this.usuariosService.getTableUsuarioPaginado();
    }
}
