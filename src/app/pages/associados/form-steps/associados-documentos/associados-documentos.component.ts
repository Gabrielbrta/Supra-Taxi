import { Component, computed, input } from '@angular/core';
import { FormGroup, ReactiveFormsModule, ɵInternalFormsSharedModule } from '@angular/forms';
import { InputFileComponent } from '../../../../shared/components/forms/input-file/input-file.component';
import { ModalComponent } from "../../../../shared/components/modal/modal.component";
import { ColumnType, PageResult, TableAction } from '../../../../shared/models/table/Table';
import { TableVeiculos } from '../../../../shared/models/associados/dataSourceTableVeiculos';
import { TableComponent } from '../../../../shared/components/table/table.component';
import { DocumentosTable } from '../../../../shared/models/associados/dataSourceDocumentos';
import moment from 'moment';
import { StatusEnum } from '../../../../shared/enums/StatusEnum';

@Component({
  selector: 'app-associados-documentos',
  imports: [ɵInternalFormsSharedModule, ReactiveFormsModule, InputFileComponent, ModalComponent, TableComponent],
  templateUrl: './associados-documentos.component.html',
  styleUrl: './associados-documentos.component.scss',
})
export class AssociadosDocumentosComponent {
    formGroup = input.required<FormGroup>();
    toggleModal = false;

    closeModal() {
      this.toggleModal = false;
    }
    
    openModal() {
      this.toggleModal = true;
    }

    actionClick(event: {action: any; row: any}) {
      switch (event.action) {
      case 'view':
        this.openModal();
        break;

      case 'edit':
        this.openModal();
        break;
      }
    }

  dataSource!: PageResult<DocumentosTable>;
  tableColumns: ColumnType<DocumentosTable>[] =  [
    {
      key: 'documento',
      header: 'Documento',
    },
    {
      key: 'status',
      header: 'Status',
      type: 'status'
    },
    {
      key: 'upload',
      header: 'Data upload',
      type: 'date'
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
      // },
        // {
        //   icon: 'LucideKeyRound',
        //   action: 'view',
        //   tooltip: 'Alterar senha'
        // },
        {
          icon: 'LucidePrinter',
          action: 'print',
          tooltip: 'Imprimir'
        },
        // {
        //   icon: 'LucideLockOpen',
        //   action: 'view',
        //   tooltip: 'Remover banimento'
        // },
    
      ]

  ngOnInit(): void {
    this.atualizarTabela();
    this.formGroup().valueChanges.subscribe(() => {
      this.atualizarTabela();
    })        
  }
    private atualizarTabela() {
    const form = this.formGroup();

    this.dataSource = {
      data: [
        this.criarDocumento('CPF', 'cpf'),
        this.criarDocumento('CNH', 'cnhDocumento'),
        this.criarDocumento('RG', 'rg'),
        this.criarDocumento('RCT', 'rct'),
        this.criarDocumento('Foto', 'foto'),
        this.criarDocumento('CPEST', 'cpest'),
        this.criarDocumento('Alvará', 'alvara'),
        this.criarDocumento('Antecedentes criminais', 'antecedentesCriminais'),
        this.criarDocumento('Comprovante de residência', 'comprovanteResidencia'),
      ]
    };
  }

  private criarDocumento(nome: string, control: string): DocumentosTable {
    return {
      documento: nome,
      status: this.formGroup().get(control)?.value
        ? StatusEnum.Enviado
        : StatusEnum.Pendente,
      upload: moment(),
    };
  }
}
