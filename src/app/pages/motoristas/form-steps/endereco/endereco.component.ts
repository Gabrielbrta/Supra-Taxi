import { Component, input } from '@angular/core';
import { FormGroup, ReactiveFormsModule, ɵInternalFormsSharedModule } from '@angular/forms';
import { InputComponent } from '../../../../shared/components/forms/input/input.component';
import { InputSelectComponent } from '../../../../shared/components/forms/input-select/input-select.component';

@Component({
  selector: 'app-endereco',
  imports: [InputComponent, ɵInternalFormsSharedModule, ReactiveFormsModule],
  templateUrl: './endereco.component.html',
  styleUrl: './endereco.component.scss',
})
export class EnderecoComponent {
  formGroup = input.required<FormGroup>();
}
