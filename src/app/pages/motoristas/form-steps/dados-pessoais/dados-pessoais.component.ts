import { Component, input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-dados-pessoais',
  imports: [],
  templateUrl: './dados-pessoais.component.html',
  styleUrl: './dados-pessoais.component.scss',
})
export class DadosPessoaisComponent {
  formGroup = input<FormGroup>();
  
}
