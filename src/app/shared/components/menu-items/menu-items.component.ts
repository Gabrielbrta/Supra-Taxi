import { Component, input } from '@angular/core';
import { MenuItem } from '../../models/menu/menuList';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { LucideDynamicIcon } from '@lucide/angular';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-menu-items',
  imports: [RouterLink, RouterLinkActive, LucideDynamicIcon, MatTooltipModule],
  templateUrl: './menu-items.component.html',
  styleUrl: './menu-items.component.scss',
})
export class MenuItemsComponent {
  closedMenu = input<boolean>();
  menuItems = input<MenuItem[]>();
  selectMenuItems = input<MenuItem[]>();

}