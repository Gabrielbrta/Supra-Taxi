import { Component, input, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule, ɵInternalFormsSharedModule } from '@angular/forms';
import { InputComponent } from '../../../../shared/components/forms/input/input.component';
import { InputSelectComponent } from '../../../../shared/components/forms/input-select/input-select.component';
import { PageResult } from '../../../../shared/models/table/Table';
import { StatusMotoristaQuery } from '../../../../shared/models/forms/StatusMotorista';
import { StatusEnum } from '../../../../shared/enums/StatusEnum';

@Component({
  selector: 'app-dados-profissionais',
  imports: [InputComponent, ɵInternalFormsSharedModule, ReactiveFormsModule, InputSelectComponent],
  templateUrl: './dados-profissionais.component.html',
  styleUrl: './dados-profissionais.component.scss',
})
export class DadosProfissionaisComponent implements OnInit {
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
