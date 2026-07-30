import { Component, effect, ElementRef, forwardRef, input, viewChild } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerInputEvent, MatDatepickerModule} from '@angular/material/datepicker';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { Moment } from 'moment';
import IMask from 'imask';
import { LucideAArrowDown, LucideDynamicIcon } from "@lucide/angular";
import { Icons } from '../../../icons/icons';
import { output } from '@angular/core';
import moment from 'moment';

type InputValue = string | Moment | Date | null;

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
  value: InputValue = null;
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


  private onChange = (value: InputValue) => {};
  private onTouched = () => {};
  private imask?: ReturnType<typeof IMask>;
  private readonly dateInputFormats = [moment.ISO_8601, 'DD/MM/YYYY', 'YYYY-MM-DD'];

  private createMask(mask: string) {
  switch (mask) {
    case 'placa':
      return {
        mask: [
          { mask: 'aaa-0000' },
        ],
        prepare: (str: string) => str.toUpperCase()
      };
    case 'chassi':
      return {
        mask: '*****************', // 17 posições
        definitions: {
          '*': /[A-HJ-NPR-Z0-9]/
        },
        prepare: (str: string) => str.toUpperCase()
    };
    default:
      return {
        mask
      };
  }
}

  inputRef = viewChild<ElementRef<HTMLInputElement>>('input');

  disabled: boolean = false;

  private formatDateValue(value: InputValue): string {
    if (!value) {
      return '';
    }

    if (moment.isMoment(value)) {
      return value.isValid() ? value.format('DD/MM/YYYY') : '';
    }

    if (value instanceof Date) {
      const parsedDate = moment(value);
      return parsedDate.isValid() ? parsedDate.format('DD/MM/YYYY') : '';
    }

    const parsedDate = moment(value, this.dateInputFormats, true);
    if (parsedDate.isValid()) {
      return parsedDate.format('DD/MM/YYYY');
    }

    const fallbackDate = moment(value);
    return fallbackDate.isValid() ? fallbackDate.format('DD/MM/YYYY') : '';
  }

  private syncNativeInputValue(input: HTMLInputElement): void {
    if (this.type() === 'date') {
      input.value = this.formatDateValue(this.value);
      return;
    }

    if (this.imask) {
      this.imask.value = String(this.value ?? '');
    } else {
      input.value = String(this.value ?? '');
    }
  }

  constructor() {
    effect(() => {
      const input = this.inputRef()?.nativeElement;

      if (!input) {
        return;
      }

      if (this.imask) {
        this.imask.destroy();
        this.imask = undefined;
      }

      if (this.mask()) {
        this.imask =  IMask(input, this.createMask(this.mask()!));

        this.imask.value = String(this.value ?? '');

        this.imask.on('accept', () => {
          this.value = this.imask!.value;
          this.onChange(this.imask!.value);
          this.onTouched();
        });
      } else {
        this.syncNativeInputValue(input);
      }
  });
  }

  writeValue(value: InputValue): void {
    this.value = value;

    const input = this.inputRef()?.nativeElement;

    if (!input) {
      return;
    }

    if (this.type() === 'date') {
      input.value = this.formatDateValue(value);
      return;
    }

    this.syncNativeInputValue(input);
  }

  registerOnChange(fn: (value: InputValue) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
  this.disabled = isDisabled;

    const input = this.inputRef()?.nativeElement;
    if (input) {
      input.disabled = isDisabled;
    }
  }

  onInput(event: Event) {
    if (this.imask) {
      return;
    }
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

    const input = this.inputRef()?.nativeElement;
    if (input) {
      input.value = this.formatDateValue(event.value);
    }

    this.onChange(event.value);
    this.onTouched();
  }

}
