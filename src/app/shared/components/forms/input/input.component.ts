import { afterNextRender, Component, effect, ElementRef, forwardRef, input, viewChild } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerInputEvent, MatDatepickerModule} from '@angular/material/datepicker';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { Moment } from 'moment';
import IMask from 'imask';
import { LucideAArrowDown, LucideDynamicIcon } from "@lucide/angular";
import { Icons } from '../../../icons/icons';
import { output } from '@angular/core';

@Component({
  selector: 'app-input',
  imports: [
    MatInputModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    LucideDynamicIcon,
    MatInputModule,
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
  placeholder = input<string>();
  hidden = input<boolean>();
  readOnly = input<boolean>();
  type = input.required<string>();
  id = input<string>();
  mask = input<string | null>(null);
  max = input<number | null>();
  min = input<number | null>();
  inputId = crypto.randomUUID();
  icons = Icons;
  search = output<string>();


  private onChange = (value:string | Moment | null ) => {};
  private onTouched = () => {};
  private imask?: ReturnType<typeof IMask>;

  inputRef = viewChild<ElementRef<HTMLInputElement>>('input');

  disabled: boolean = false;

  constructor() {
    afterNextRender(() => {
      const element = this.inputRef()?.nativeElement;
      const mask = this.mask();

      if (!element || !mask) {
        return;
      }

      this.imask?.destroy();

      this.imask = IMask(element, {
        mask
      });

      this.imask.on('accept', () => {
        this.onChange(this.imask!.value);
      });
    });
  }

  writeValue(value: string | Moment | null): void {
    this.value = value ?? '';
    if (this.imask) {
      this.imask.value = String(this.value ?? '');
      this.imask.updateValue();
    }
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
  onSearch(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.search.emit(value);
  }


  onDateChange(event: MatDatepickerInputEvent<Moment>) {
    this.value = event.value;

    this.onChange(event.value);
    this.onTouched();
  }

}
