import { Component } from '@angular/core';
import { SidebarComponent } from '../../shared/components/sidebar/sidebar.component';
import { TopbarComponent } from '../../shared/components/topbar/topbar.component';
import { RouterOutlet } from "@angular/router";
import { Icons } from '../../shared/icons/icons';
import { ContentPageHeaderComponent } from '../../shared/components/content-page-header/content-page-header.component';

@Component({
  selector: 'app-main-layout',
  imports: [SidebarComponent, TopbarComponent, RouterOutlet, ContentPageHeaderComponent],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss',
})
export class MainLayoutComponent {

  isClose!: boolean;
  constructor () {
    if(localStorage.getItem('menu')) {
      this.isClose = JSON.parse(localStorage.getItem('menu')!);
    }
  }
  icons = Icons;

  onToggleClose(data: boolean) {
    this.isClose = data;
  }

}
