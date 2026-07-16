import { Component, computed, forwardRef, input, OnInit, signal } from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
  FormControl
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { SelectOption } from '../../models/forms/SelectOption';

@Component({
  selector: 'app-select-autocomplete',
  imports: [
    MatFormFieldModule,
    MatSelectModule,
    ReactiveFormsModule,
    NgxMatSelectSearchModule
],
  templateUrl: './select-autocomplete.component.html',
  styleUrl: './select-autocomplete.component.scss',
  providers: [
  {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => SelectAutocompleteComponent),
    multi: true
  }
]
})
export class SelectAutocompleteComponent implements ControlValueAccessor, OnInit {

  label = input<string>();
  options = input.required<SelectOption[]>();
  required = input<boolean>();
  searchControl = new FormControl('');
  selectControl = new FormControl<string[]>([]);

  filteredOptions = signal<SelectOption[]>([]);

  value: string[] = [];

  disabled = false;
  private onChange = (_: string[]) => {};
  private onTouched = () => {};

  constructor() {
    this.filteredOptions.set([]);
    this.searchControl.valueChanges.subscribe(search => {
      const filtro = (search ?? '').toLowerCase();

      if (!filtro) {
      this.filteredOptions.set([...this.options()]);
      return;
    }

      this.filteredOptions.set(
        this.options().filter(item => 
          item.nome.toLowerCase().includes(filtro)
        )
      )
    })

    this.selectControl.valueChanges.subscribe(value => {
        this.value = value ?? [];
        this.onChange(this.value);
        this.onTouched();
    })
  }

  ngOnInit(): void {
    this.filteredOptions.set([...this.options()]);
  }

  writeValue(value: string[]): void {
    this.value = value ?? [];

    this.selectControl.setValue(this.value, { emitEvent: false });
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    if (isDisabled) {
      this.selectControl.disable({ emitEvent: false });
    } else {
      this.selectControl.enable({ emitEvent: false });
    }
  }

  selectionChange(event: MatSelectChange) {
    const value = event.value

    this.onChange(value);
    this.onTouched();
  }


}
