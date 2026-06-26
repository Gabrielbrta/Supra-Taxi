import { Component, forwardRef, input } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerInputEvent, MatDatepickerModule} from '@angular/material/datepicker';
import { MatLabel, MatHint } from '@angular/material/select';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { Moment } from 'moment';
@Component({
  selector: 'app-input',
  imports: [
    MatLabel, 
    MatHint, 
    MatInputModule,
    MatDatepickerModule, 
    ReactiveFormsModule, 
    MatInputModule
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true
    }
  ],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
})
export class InputComponent implements ControlValueAccessor {
  value: string | Moment | null = null;
  label = input.required<string>();
  required = input<boolean>();
  placeholder = input.required<string>();
  hidden = input<boolean>();
  type = input.required<string>();
  id = input<string>();

  private onChange = (value:string | Moment | null ) => {};
  private onTouched = () => {};
  disabled: boolean = false;

  writeValue(value: string | Moment | null): void {
    this.value = value ?? '';
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

  onInput(event: Event) {
    const value = (event.target as HTMLInputElement).value;

    this.value = value;
    this.onChange(value);
    this.onTouched();
  }

  onDateChange(event: MatDatepickerInputEvent<Moment>) {
    this.value = event.value;

    this.onChange(event.value);
    this.onTouched();
  }

}
