import { Component, inject, input, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule, ɵInternalFormsSharedModule } from '@angular/forms';
import { InputComponent } from "../../../../shared/components/forms/input/input.component";
import { InputSelectComponent } from "../../../../shared/components/forms/input-select/input-select.component";
import { FormsService } from '../../../../core/services/forms.service';
import { EscolaridadeQuery } from '../../../../shared/models/forms/EscolaridadeQuery';
import { PageResult } from '../../../../shared/models/table/Table';

@Component({
  selector: 'app-dados-pessoais',
  imports: [InputComponent, ɵInternalFormsSharedModule, ReactiveFormsModule, InputSelectComponent],
  templateUrl: './dados-pessoais.component.html',
  styleUrl: './dados-pessoais.component.scss',
})
export class DadosPessoaisComponent implements OnInit {
  private readonly formsService = inject(FormsService);
  formGroup = input.required<FormGroup>();
  escolaridadeDataSource!: PageResult<EscolaridadeQuery>;

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
