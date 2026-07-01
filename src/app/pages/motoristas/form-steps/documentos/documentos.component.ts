import { Component, input } from '@angular/core';
import { FormGroup, ReactiveFormsModule, ɵInternalFormsSharedModule } from '@angular/forms';
import { InputFileComponent } from '../../../../shared/components/forms/input-file/input-file.component';

@Component({
  selector: 'app-documentos',
  imports: [ ɵInternalFormsSharedModule, ReactiveFormsModule, InputFileComponent],
  templateUrl: './documentos.component.html',
  styleUrl: './documentos.component.scss',
})
export class DocumentosComponent {
  formGroup = input.required<FormGroup>();
}
