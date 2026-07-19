import { Component, Input, OnInit, computed, effect, forwardRef, input, signal } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';
import { OpcaoChecklist, ItemChecklist } from '../../models/table/TableCheckList';
import { MatTableModule } from '@angular/material/table';
import { MatRadioModule } from '@angular/material/radio';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-table-checklist',
  imports: [MatTableModule,MatRadioModule, FormsModule, CommonModule],
  templateUrl: './table-checklist.component.html',
  styleUrl: './table-checklist.component.scss',
  providers: [
     {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TableChecklistComponent),
      multi: true
    }
  ]
})
export class TableChecklistComponent implements ControlValueAccessor {
  posicoes = input<string[]>([]);
  opcoes = input<OpcaoChecklist[]>([]);

  internalData = signal<ItemChecklist[]>([]);
  displayedColumns = computed(() => [
    'posicao', 
    ...this.opcoes().map(o => o.key)
  ]);

  private onChange: (value: ItemChecklist[]) => void = () => {};
  public onTouched: () => void = () => {};

  constructor() {
    effect(() => {
      if(this.posicoes().length > 0 && this.internalData().length === 0) {
        this.internalData.set(
          this.posicoes().map(pos => ({posicao: pos, status: null}))
        );
      }
    });
  }

  writeValue(value: ItemChecklist[] | null): void {
    if (value && value.length > 0) {
      this.internalData.set(value);
    } else if (this.posicoes().length > 0) {
      this.internalData.set(
        this.posicoes().map(pos => ({ posicao: pos, status: null }))
      );
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
  }

  onStatusChange(row: ItemChecklist, statusKey: string) {
    row.status = statusKey;
    this.internalData.update(data => 
      data.map(item => 
        item.posicao === row.posicao 
          ? { ...item, status: statusKey } // Cria um novo objeto apenas para a linha alterada
          : item
      )
    );
    this.onChange(this.internalData()); // Emite o valor para o formulário pai
    this.onTouched();
  }

}
