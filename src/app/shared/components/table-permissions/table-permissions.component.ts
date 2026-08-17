import { CommonModule } from '@angular/common';
import { Component, computed, effect, forwardRef, input, signal } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTableModule } from '@angular/material/table';
import { PermissionColumn, PermissionKey, PermissionRow } from '../../models/table/TablePermissions';

const DEFAULT_COLUMNS: PermissionColumn[] = [
  { key: 'visualizar', label: 'Visualizar' },
  { key: 'cadastrar', label: 'Cadastrar' },
  { key: 'editar', label: 'Editar' },
  { key: 'tudo', label: 'Tudo' },
];

@Component({
  selector: 'app-table-permissions',
  imports: [MatTableModule, MatCheckboxModule, FormsModule, CommonModule],
  templateUrl: './table-permissions.component.html',
  styleUrl: './table-permissions.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TablePermissionsComponent),
      multi: true,
    },
  ],
})
export class TablePermissionsComponent implements ControlValueAccessor {
  modulos = input<string[]>([]);
  colunas = input<PermissionColumn[]>(DEFAULT_COLUMNS);

  disabled = false;
  internalData = signal<PermissionRow[]>([]);
  displayedColumns = computed(() => [
    'modulo',
    ...this.colunas().map((coluna) => coluna.key),
  ]);

  private onChange: (value: PermissionRow[]) => void = () => {};
  public onTouched: () => void = () => {};

  constructor() {
    effect(() => {
      const modulos = this.modulos();
      const currentRows = this.internalData();

      if (modulos.length === 0) {
        return;
      }

      if (currentRows.length === 0 || currentRows.length !== modulos.length) {
        this.internalData.set(this.buildRows(modulos));
      }
    });
  }

  writeValue(value: PermissionRow[] | null): void {
    if (value && value.length > 0) {
      this.internalData.set(value.map((row) => this.normalizeRow(row)));
      return;
    }

    if (this.modulos().length > 0) {
      this.internalData.set(this.buildRows(this.modulos()));
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

  onPermissionChange(row: PermissionRow, columnKey: PermissionKey, checked: boolean): void {
    const updatedRows = this.internalData().map((item) => {
      if (item.modulo !== row.modulo) {
        return item;
      }

      const nextRow = { ...item, [columnKey]: checked };

      if (columnKey === 'tudo') {
        return {
          ...nextRow,
          visualizar: checked,
          cadastrar: checked,
          editar: checked,
          tudo: checked,
        };
      }

      const allChecked = nextRow.visualizar && nextRow.cadastrar && nextRow.editar;

      return {
        ...nextRow,
        tudo: allChecked,
      };
    });

    this.internalData.set(updatedRows);
    this.onChange(updatedRows);
    this.onTouched();
  }

  isChecked(row: PermissionRow, columnKey: PermissionKey): boolean {
    return row[columnKey];
  }

  private buildRows(modulos: string[]): PermissionRow[] {
    return modulos.map((modulo) => ({
      modulo,
      visualizar: false,
      cadastrar: false,
      editar: false,
      tudo: false,
    }));
  }

  private normalizeRow(row: PermissionRow): PermissionRow {
    const tudo = row.visualizar && row.cadastrar && row.editar;

    return {
      modulo: row.modulo,
      visualizar: row.visualizar,
      cadastrar: row.cadastrar,
      editar: row.editar,
      tudo: row.tudo || tudo,
    };
  }
}