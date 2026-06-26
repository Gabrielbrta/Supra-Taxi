import { Component, input } from '@angular/core';
import { FormGroup, ReactiveFormsModule, ɵInternalFormsSharedModule } from '@angular/forms';
import { InputComponent } from "../../../../shared/components/forms/input/input.component";

@Component({
  selector: 'app-dados-pessoais',
  imports: [InputComponent, ɵInternalFormsSharedModule, ReactiveFormsModule],
  templateUrl: './dados-pessoais.component.html',
  styleUrl: './dados-pessoais.component.scss',
})
export class DadosPessoaisComponent {
  formGroup = input.required<FormGroup>();

}
