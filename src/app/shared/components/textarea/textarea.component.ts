import { Component, computed, forwardRef, input, OnInit, signal } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-textarea',
  imports: [],
  templateUrl: './textarea.component.html',
  styleUrl: './textarea.component.scss',
  providers: [
     {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextareaComponent),
      multi: true
    }
  ]
})
export class TextareaComponent implements ControlValueAccessor {

  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};
  disabled = signal(false);
  isFocused = signal(false);
  
  value = signal<string>('');
  label = input<string>('');
  placeholder = input<string>('');
  rows = input<number>(4);
  maxlength = input<number | null>(null);
  id = input<string>(crypto.randomUUID());
  required = input<boolean>(false);
  showCharCount = input<boolean>(false);
  hint = input<string>('');

  charCount = computed(() => this.value().length)
  isOverLimit = computed(() => {
    const max = this.maxlength();
    return max !== null && this.charCount() > max;
  })

  hasError = computed(() => this.isOverLimit());

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  writeValue(value: string): void {
    this.value.set(value ?? '');
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled.set(isDisabled);
  }

  onInput(event: Event) {
    const value = (event.target as HTMLTextAreaElement).value ?? '';
    this.value.set(value);
    this.onChange(value);
  }
  onFocus(): void {
    this.isFocused.set(true);
  }

  onBlur(): void {
    this.isFocused.set(false);
    this.onTouched();
  }

}
