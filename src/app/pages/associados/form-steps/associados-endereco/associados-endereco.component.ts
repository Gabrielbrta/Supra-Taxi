import { Component, input } from '@angular/core';
import { FormGroup, ReactiveFormsModule, ɵInternalFormsSharedModule } from '@angular/forms';
import { InputComponent } from '../../../../shared/components/forms/input/input.component';

@Component({
  selector: 'app-associados-endereco',
  imports: [InputComponent, ɵInternalFormsSharedModule, ReactiveFormsModule],
  templateUrl: './associados-endereco.component.html',
  styleUrl: './associados-endereco.component.scss',
})
export class AssociadosEnderecoComponent {
  formGroup = input.required<FormGroup>();
}
