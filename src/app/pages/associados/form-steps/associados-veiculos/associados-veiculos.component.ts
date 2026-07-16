import { Component, computed, input, OnInit, signal } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators, ɵInternalFormsSharedModule } from '@angular/forms';
import { ColumnType, PageResult, TableAction } from '../../../../shared/models/table/Table';
import { DataSourceTableMotorista } from '../../../../shared/models/motoristas/dataSourceTableMotorista';
import { TableComponent } from '../../../../shared/components/table/table.component';
import { TableVeiculos } from '../../../../shared/models/associados/dataSourceTableVeiculos';
import { ModalComponent } from '../../../../shared/components/modal/modal.component';
import { InputComponent } from '../../../../shared/components/forms/input/input.component';
import { ButtonComponent } from '../../../../shared/components/button/button.component';

@Component({
  selector: 'app-associados-veiculos',
  imports: [ɵInternalFormsSharedModule, ReactiveFormsModule, TableComponent, ModalComponent, InputComponent, ButtonComponent],
  templateUrl: './associados-veiculos.component.html',
  styleUrl: './associados-veiculos.component.scss',
})
export class AssociadosVeiculosComponent implements OnInit {
  formArray = input.required<FormArray<FormGroup>>();
  mode = input<'create' | 'edit' | 'view'>('create');
  toggleConfirmModal = false;
  indexVeiculoAtual: number | null = null;   

  toggleModal = false;
  titleModal: string = 'Adicionar veículo';
  dataSource = signal<PageResult<TableVeiculos>>({ data: [] });
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

  getActions(): TableAction[]  {
    if(this.mode() === 'view') {
      return [ 
        {
        icon: 'LucideEye',
        action: 'view',
        tooltip: 'Visualizar'
        }
      ]
    }

    return [
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
    ];
  }

  private createVeiculoForm(data?: Partial<TableVeiculos>) {
    return new FormGroup({
      placa: new FormControl(data?.placa ?? '', Validators.required),
      marca: new FormControl(data?.marca ?? '', Validators.required),
      modelo: new FormControl(data?.modelo ?? '', Validators.required),
      ano: new FormControl(data?.ano ?? '', Validators.required),
      cor: new FormControl(data?.cor ?? '', Validators.required),
      chassi: new FormControl(data?.chassi ?? '', Validators.required),
      renavan: new FormControl(data?.renavan ?? '', Validators.required),
      observacoes: new FormControl(data?.observacoes ?? '')
    })
  }

  private updateTable() {
    this.dataSource.set({
      data: this.formArray().getRawValue() as TableVeiculos[]
    });

    console.log(this.dataSource())
  }
      

  ngOnInit(): void {
    this.updateTable();
    console.log(this.formArray().value);
    this.formArray().valueChanges.subscribe(() => {
      this.updateTable();
    });
  }

 veiculoForm = new FormGroup({
  placa: new FormControl<string>('', { nonNullable: true, validators: Validators.required }),
  marca: new FormControl<string>('', { nonNullable: true, validators: Validators.required }),
  modelo: new FormControl<string>('', { nonNullable: true, validators: Validators.required }),
  ano: new FormControl<string>('', { nonNullable: true, validators: Validators.required }),
  cor: new FormControl<string>('', { nonNullable: true, validators: Validators.required }),
  chassi: new FormControl<string>('', { nonNullable: true, validators: Validators.required }),
  renavan: new FormControl<string>('', { nonNullable: true, validators: Validators.required }),
  observacoes: new FormControl<string>('', { nonNullable: true }),
});

 actionClick(event: {action: any; row: any, index?: number}) {
    switch (event.action) {
    case 'view':
      this.titleModal = 'Visualizar veículo';
      this.veiculoForm.reset();
      this.veiculoForm.patchValue(
        this.formArray().at(event.index!).getRawValue()
      )
      this.veiculoForm.disable();
      this.openModal();
      break;
      
      case 'edit':
        this.veiculoForm.reset();
        this.veiculoForm.patchValue(
          this.formArray().at(event.index!).getRawValue()
        )
        this.veiculoForm.enable();
        this.titleModal = 'Editar veículo';
        this.openModal();
        break;
        
        case 'delete':
          this.veiculoForm.reset();
          this.toggleConfirmModal = true;
          this.indexVeiculoAtual = event.index!;
        break;
    }
  }
  novoVeiculo(event: MouseEvent) {
    this.titleModal = 'Adicionar veículo';
    this.openModal();
  }

  addNovoVeiculos() {
  if (this.veiculoForm.invalid) {
    this.veiculoForm.markAllAsTouched();
    return;
  }
   this.formArray().push(
      this.createVeiculoForm(this.veiculoForm.getRawValue())
  );
    this.veiculoForm.reset();
    this.closeModal();
  }

  deleteVeiculo() {
    this.formArray().removeAt(this.indexVeiculoAtual!);
    this.closeModal();
  }

  openModal() {
    this.toggleModal = true;
  }
  closeModal() {
    this.toggleModal = false;
    this.toggleConfirmModal = false;
  }
    

    
}
