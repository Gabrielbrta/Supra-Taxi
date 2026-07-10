import { Component, input, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule, ɵInternalFormsSharedModule } from '@angular/forms';
import { ColumnType, PageResult, TableAction } from '../../../../shared/models/table/Table';
import { DataSourceTableMotorista } from '../../../../shared/models/motoristas/dataSourceTableMotorista';
import { TableComponent } from '../../../../shared/components/table/table.component';
import { TableVeiculos } from '../../../../shared/models/associados/dataSourceTableVeiculos';
import { ModalComponent } from '../../../../shared/components/modal/modal.component';
import { InputComponent } from '../../../../shared/components/forms/input/input.component';

@Component({
  selector: 'app-associados-veiculos',
  imports: [ɵInternalFormsSharedModule, ReactiveFormsModule, TableComponent, ModalComponent, InputComponent],
  templateUrl: './associados-veiculos.component.html',
  styleUrl: './associados-veiculos.component.scss',
})
export class AssociadosVeiculosComponent implements OnInit {
  formGroup = input.required<FormGroup>();
  toggleModal = false;
  dataSource!: PageResult<TableVeiculos>;
  tableColumns: ColumnType<TableVeiculos>[] =  [
    {
      key: 'placa',
      header: 'Placa',
    },
    {
      key: 'marca',
      header: 'Marca',
    },
    {
      key: 'modelo',
      header: 'Modelo',
    },
    {
      key: 'ano',
      header: 'Ano',
    },
    {
      key: 'cor',
      header: 'Cor',
      type: 'tel'
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
      

  ngOnInit(): void {
    this.dataSource = {
      data: [
      {
        placa: 'ABC-1D23',
        modelo: 'Corolla XEi',
        marca: 'Toyota',
        ano: '2022',
        cor: 'Prata',
      },
      {
        placa: 'DEF-4G56',
        modelo: 'Onix Plus',
        marca: 'Chevrolet',
        ano: '2021',
        cor: 'Branco',
      }
    ]
    }
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

  openModal() {
    this.toggleModal = true;
  }
  closeModal(event: MouseEvent) {
    this.toggleModal = false;
  }
    

    
}
