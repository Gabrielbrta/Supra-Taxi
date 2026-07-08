import { Component, input } from '@angular/core';
import { FormGroup, ReactiveFormsModule, ɵInternalFormsSharedModule } from '@angular/forms';
import { InputFileComponent } from '../../../../shared/components/forms/input-file/input-file.component';

@Component({
  selector: 'app-associados-documentos',
  imports: [ɵInternalFormsSharedModule, ReactiveFormsModule, InputFileComponent],
  templateUrl: './associados-documentos.component.html',
  styleUrl: './associados-documentos.component.scss',
})
export class AssociadosDocumentosComponent {
    formGroup = input.required<FormGroup>();
}
