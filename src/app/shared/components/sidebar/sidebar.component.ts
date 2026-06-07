import { Component, EventEmitter, Output } from '@angular/core';
import { Icons } from '../../icons/icons';
import { LucideAngularModule } from 'lucide-angular';
import { MenuItemsComponent } from '../menu-items/menu-items.component';

@Component({
  selector: 'app-sidebar',
  imports: [LucideAngularModule, MenuItemsComponent ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  @Output()
  toggleSidebar = new EventEmitter<boolean>();

  isClose: boolean = false;
  icons = Icons;
  
  toggleClose() {
    this.isClose = !this.isClose;

    this.toggleSidebar.emit(this.isClose);
  }

}
