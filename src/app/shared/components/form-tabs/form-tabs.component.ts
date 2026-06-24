import { Component, input, OnInit, output } from '@angular/core';
import { TabsHeader } from '../../models/forms/TabsHeader';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-form-tabs',
  imports: [],
  templateUrl: './form-tabs.component.html',
  styleUrl: './form-tabs.component.scss',
})
export class FormTabsComponent implements OnInit {

  tabs = input.required<TabsHeader[]>();
  clicked = output<string>();
  activeTab: string = '';

  ngOnInit() {
    this.selectFirstTab();
  }

  selectedTab(tab: string) {
    this.clicked.emit(tab)
    this.activeTab = tab; 
  }

  selectFirstTab() {
    if(this.tabs().length > 0) {
      this.activeTab = this.tabs()[0].key;
    }
  }
}
