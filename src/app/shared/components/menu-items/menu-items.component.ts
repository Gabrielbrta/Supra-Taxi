import { Component, input } from '@angular/core';
import { MenuItem } from '../../models/menu/menuList';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-menu-items',
  imports: [RouterLink, RouterLinkActive, LucideAngularModule, MatTooltipModule],
  templateUrl: './menu-items.component.html',
  styleUrl: './menu-items.component.scss',
})
export class MenuItemsComponent {
  closedMenu = input<boolean>();
  menuItems = input<MenuItem[]>();
  selectMenuItems = input<MenuItem[]>();

}