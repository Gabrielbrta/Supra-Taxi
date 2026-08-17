import { Component, forwardRef, input, signal } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export interface RadioOptions {
    value: string | number;
    label: string;
    labelDescription?: string;
    disabled?: boolean;
}

@Component({
  selector: 'app-radio-button',
  imports: [],
  templateUrl: './radio-button.component.html',
  styleUrl: './radio-button.component.scss',
   providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RadioButtonComponent),
      multi: true
    }
  ],
})
export class RadioButtonComponent implements ControlValueAccessor {

  options = input.required<RadioOptions[]>();
  name = input<string>('radio-group');
  ariaLabel = input<string>();
  customLabel = input<boolean>(false);
  required = input<boolean>(false);
  label = input<string>();

  private selectedValue = signal<string | number | null>(null);
  private onChange: (value: string | number | null) => void = () => {};
  private onTouched: () => void = () => {};

  disabled = signal(false);

  registerOnChange(fn: any): void {
    this.onChange = fn
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled.set(isDisabled);
  }

  writeValue(value: number | string | null): void {
    this.selectedValue.set(value);
  }

  isSelected(value: number | string) : boolean {
    return this.selectedValue() === value;
  }

  selectOption(value: number | string) {
    if(this.disabled()) return;

    this.selectedValue.set(value);
    this.onChange(value);
    this.onTouched();
  }
  
}
