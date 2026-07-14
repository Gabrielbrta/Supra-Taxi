import {Component, computed, input, output, } from '@angular/core';
import {MatPaginatorModule, PageEvent} from '@angular/material/paginator';
import { MatTableModule} from '@angular/material/table';
import { ColumnType, PageResult, paginadora, TableAction } from '../../models/table/Table';
import { DatePipe } from '@angular/common';
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from '@angular/material/button';
import { ButtonComponent } from '../button/button.component';
import { BadgeComponent } from '../badge/badge.component';
import { ChangeDataToBrasilPipe } from '../../pipes/text/change-data-to-brasil-pipe';
import { ShortNamePipe } from '../../pipes/text/short-name-pipe';
import { ShortenerLongTextPipe } from '../../pipes/text/shortener-long-text-pipe';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CpfPipe } from '../../pipes/text/cpf-pipe';
import { TelefonePipe } from '../../pipes/text/telefone-pipe';

@Component({
  selector: 'app-table',
  imports: [MatTableModule, MatPaginatorModule, MatButtonModule, MatIconModule, ButtonComponent, BadgeComponent, ChangeDataToBrasilPipe, ShortNamePipe, ShortenerLongTextPipe, MatTooltipModule, CpfPipe, TelefonePipe],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent {
  
  displayedColumns = input.required<ColumnType<any>[]>();
  dataSource =  input.required<PageResult<any>>();
  actions = input<TableAction[]>([])
  actionClick = output<{action: string, row:any, index?: number}>();
  pageChange = output<PageEvent>();

  
  columnNames = computed(() => {
    const columns = this.displayedColumns().map(col => col.key as string);

    if(this.actions().length > 0) {
      columns.push('actions')
    }

    return columns;
  });

  onActionClick(action: string, row: any, index?: number) {
    this.actionClick.emit({
      action,
      row,
      index
    });
  }

}