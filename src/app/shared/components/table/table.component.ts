import {Component, computed, input, output, } from '@angular/core';
import {MatPaginatorModule, PageEvent} from '@angular/material/paginator';
import { MatTableModule} from '@angular/material/table';
import { ColumnType, PageResult, TableAction } from '../../models/table/Table';
import { DatePipe } from '@angular/common';
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from '@angular/material/button';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-table',
  imports: [MatTableModule, MatPaginatorModule, DatePipe, MatButtonModule, MatIconModule, ButtonComponent],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent {
  
  displayedColumns = input.required<ColumnType<any>[]>();
  dataSource =  input.required<PageResult<any>>();
  actions = input<TableAction[]>([])
  actionClick = output<{action: string, row:any}>();
  pageChange = output<PageEvent>();

  
  columnNames = computed(() => {
    const columns = this.displayedColumns().map(col => col.key as string);

    if(this.actions().length > 0) {
      columns.push('actions')
    }

    return columns;
  });

  onActionClick(action: string, row: any) {
    this.actionClick.emit({
      action,
      row
    });
  }

}