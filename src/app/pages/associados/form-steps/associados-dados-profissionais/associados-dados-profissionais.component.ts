import { Component, input } from '@angular/core';
import { InputComponent } from '../../../../shared/components/forms/input/input.component';
import { FormGroup, ReactiveFormsModule, ɵInternalFormsSharedModule } from '@angular/forms';
import { InputSelectComponent } from '../../../../shared/components/forms/input-select/input-select.component';
import { PageResult } from '../../../../shared/models/table/Table';
import { StatusMotoristaQuery } from '../../../../shared/models/forms/StatusMotorista';
import { StatusEnum } from '../../../../shared/enums/StatusEnum';
import { SelectAutocompleteComponent } from '../../../../shared/components/select-autocomplete/select-autocomplete.component';

@Component({
  selector: 'app-associados-dados-profissionais',
  imports: [InputComponent, ɵInternalFormsSharedModule, ReactiveFormsModule, InputSelectComponent, SelectAutocompleteComponent],
  templateUrl: './associados-dados-profissionais.component.html',
  styleUrl: './associados-dados-profissionais.component.scss',
})
export class AssociadosDadosProfissionaisComponent {
    formGroup = input.required<FormGroup>();
    selectSource!: PageResult<StatusMotoristaQuery>;

    ngOnInit(): void {
      this.selectSource = {
        data: [
          {
            id: StatusEnum.Ativo,
            value: 'Ativo',
          },
          {
            id: StatusEnum.Inativo,
            value: 'Inativo',
          }
        ]
      }
    }

}
