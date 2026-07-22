import { Component, forwardRef, input } from '@angular/core';
import {ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import { PageResult } from '../../../models/table/Table';
import { MatTooltip, MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-input-select',
  imports: [
    MatFormFieldModule, 
    MatSelectModule, 
    MatInputModule, 
    FormsModule, 
    ReactiveFormsModule, 
    MatTooltip
  ],
  templateUrl: './input-select.component.html',
  styleUrl: './input-select.component.scss',

  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputSelectComponent),
      multi: true
    }
  ]
})
export class InputSelectComponent implements ControlValueAccessor {
  selectSource = input.required<PageResult<any>>()
  placeholder = input<string>('Selecione um item');
  label = input.required<string>();
  required = input<boolean>();
  value: string | null = null;
  disabled = false;

  private onChange = (value: string | null ) => {}
  private onTouched = () => {}

  writeValue(value: string | null): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onSelectionChange(value: string) {
    this.value = value;
    this.onChange(value);
    this.onTouched();
  }
}
