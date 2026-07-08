import { Component, inject, input } from '@angular/core';
import { FormGroup, ReactiveFormsModule, ɵInternalFormsSharedModule } from '@angular/forms';
import { PageResult } from '../../../../shared/models/table/Table';
import { EscolaridadeQuery } from '../../../../shared/models/forms/EscolaridadeQuery';
import { EstadoCivilQuery } from '../../../../shared/models/forms/EstadoCivilQuery';
import { FormsService } from '../../../../core/services/forms.service';
import { EstadoCivilEnum } from '../../../../shared/enums/EstadoCivilEnum';
import { InputComponent } from '../../../../shared/components/forms/input/input.component';
import { InputSelectComponent } from '../../../../shared/components/forms/input-select/input-select.component';

@Component({
  selector: 'app-associados-dados-pessoais',
  imports: [InputComponent, ɵInternalFormsSharedModule, ReactiveFormsModule, InputSelectComponent],
  templateUrl: './associados-dados-pessoais.component.html',
  styleUrl: './associados-dados-pessoais.component.scss',
})
export class AssociadosDadosPessoaisComponent {
private readonly formsService = inject(FormsService);
  formGroup = input.required<FormGroup>();
  escolaridadeDataSource!: PageResult<EscolaridadeQuery>;
  estadoCivilDataSource: PageResult<EstadoCivilQuery> = {
    data: [
      {id: EstadoCivilEnum.Solteiro, value: 'Solteiro(a)'},
      {id: EstadoCivilEnum.Casado, value: 'Casado(a)'},
      {id: EstadoCivilEnum.Divorciado, value: 'Divorciado(a)'},
      {id: EstadoCivilEnum.Separado, value: 'Separado(a)'},
      {id: EstadoCivilEnum.UniaoEstavel, value: 'União Estável'},
      {id: EstadoCivilEnum.Viuvo, value: 'Viúvo(a)'},
    ]
  }
  

  ngOnInit() {
    this.getSelectEscolaridade();
  }

  getSelectEscolaridade() {
    // this.formService.getEscolaridades().subscribe({
    //   next: result => {
    //     this.escolaridadeDataSource = result;
    //   },
    //   error: error => {
    //     this.escolaridadeDataSource = null;
    //     console.error(error);
    //   }
    // })
    this.escolaridadeDataSource = this.formsService.getEscolaridades();
  }

}
