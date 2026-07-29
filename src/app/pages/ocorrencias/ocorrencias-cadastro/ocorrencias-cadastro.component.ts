import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, ɵInternalFormsSharedModule } from '@angular/forms';
import { Moment } from 'moment';
import { CardFormBlockComponent } from '../../../shared/components/card-form-block/card-form-block.component';
import { InputComponent } from '../../../shared/components/forms/input/input.component';
import { ButtonComponent } from "../../../shared/components/button/button.component";
import { TextareaComponent } from '../../../shared/components/textarea/textarea.component';
@Component({
  selector: 'app-ocorrencias-cadastro',
  imports: [ReactiveFormsModule, CardFormBlockComponent, InputComponent, ButtonComponent, TextareaComponent],
  templateUrl: './ocorrencias-cadastro.component.html',
  styleUrl: './ocorrencias-cadastro.component.scss',
})
export class OcorrenciasCadastroComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      usuario: this.fb.control<string>('', [Validators.required, Validators.minLength(5)]),
      dataOcorrencia: this.fb.control<Moment | Date | null>(null, [Validators.required]),
      unidade: this.fb.control<string>('', [Validators.required]),
      descricao: this.fb.control<string>('', [Validators.required])
    })
  }

  onSubmit(event: Event){

  }

  goBack() {

  }

}
