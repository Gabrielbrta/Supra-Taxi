import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-unidades-cadastro',
  imports: [],
  templateUrl: './unidades-cadastro.component.html',
  styleUrl: './unidades-cadastro.component.scss',
})
export class UnidadesCadastroComponent {
  form: FormGroup;
  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      prefixo: this.fb.control<string>(''),
      unidade: this.fb.control<string>('', [Validators.required, Validators.min(3)])
    });
  }
}
