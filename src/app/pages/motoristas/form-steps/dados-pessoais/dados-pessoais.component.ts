import { Component, Input, input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { InputComponent } from "../../../../shared/components/forms/input/input.component";

@Component({
  selector: 'app-dados-pessoais',
  imports: [InputComponent],
  templateUrl: './dados-pessoais.component.html',
  styleUrl: './dados-pessoais.component.scss',
})
export class DadosPessoaisComponent {
  @Input() formGroup!: FormGroup;
  
}
