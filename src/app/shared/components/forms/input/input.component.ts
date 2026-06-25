import { Component, input } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerInputEvent, MatDatepickerModule} from '@angular/material/datepicker';
import { MatLabel, MatHint } from '@angular/material/select';
import {provideNativeDateAdapter} from '@angular/material/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
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
  providers: [provideNativeDateAdapter(),
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: InputComponent,
      multi: true
    }
  ],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
})
export class InputComponent implements ControlValueAccessor {
  value:string | Date | null = null;
  label = input.required<string>();
  name = input.required<string>();
  placeholder = input.required<string>();
  hidden = input<boolean>();
  type = input.required<string>();
  id = input<string>();

  private onChange = (value:string | Date | null ) => {};
  private onTouched = () => {};
  disabled: boolean = false;

  writeValue(value: string): void {
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

  onDateChange(event: MatDatepickerInputEvent<Date>) {
    const value = event.value;

    this.value = value;

    this.onChange(value);
    this.onTouched();
  }
}
