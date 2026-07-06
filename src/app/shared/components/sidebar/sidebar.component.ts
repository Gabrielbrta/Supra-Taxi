import { Component, EventEmitter, output, Output } from '@angular/core';
import { Icons } from '../../icons/icons';
import { LucideDynamicIcon } from '@lucide/angular';
import { MenuItemsComponent } from '../menu-items/menu-items.component';
import { MenuItem } from '../../models/menu/menuList';

@Component({
  selector: 'app-sidebar',
  imports: [LucideDynamicIcon, MenuItemsComponent ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  private readonly startMenuValue = false;

  constructor() {
    if(!localStorage.getItem('menu')) {
      localStorage.setItem('menu', JSON.stringify(this.startMenuValue));
    } else {
      this.isClose = JSON.parse(localStorage.getItem('menu')!);
    }
  }
  toggleSidebar = output<boolean>();
  isClose: boolean = false;
  icons = Icons;

  changeMenuValue() {
    localStorage.setItem('menu', JSON.stringify(this.isClose))
  }

  menuItems: MenuItem[] = [
    {
      name: 'Operação',
      label: 'Dashboard',
      path: '/dashboard',
      icon: this.icons.LucideLayoutDashboard,
      children: []
    },
    {
      name: null,
      label: 'Motoristas',
      path: '/motoristas',
      icon: this.icons.LucideCar,
      children: []
    },
    {
      name: null,
      label: 'Associados',
      path: '/associados',
      icon: this.icons.LucideUsers,
      children: []
    },
    {
      name: null,
      label: 'Vistorias',
      path: '/vistorias',
      icon: this.icons.LucideClipboardCheck,
      children: []
    },
    {
      name: null,
      label: 'Unidades',
      path: '/unidades',
      icon: this.icons.LucideListOrdered,
      children: []
    },
    {
      name: null,
      label: 'Ocorrências',
      path: '/ocorrencias',
      icon: this.icons.LucideOctagonAlert,
      children: []
    },
    {
      name: null,
      label: 'Banidos',
      path: '/banidos',
      icon: this.icons.LucideBan,
      children: []
    },
    {
      name: null,
      label: 'Usuários',
      path: '/usuarios',
      icon: this.icons.LucideUserCog,
      children: []
    },
    {
      name: null,
      label: 'Configurações',
      path: '/configuracoes',
      icon: this.icons.LucideSettings,
      children: []
    }
  ];

  
  toggleClose() {
    this.isClose = !this.isClose;
    this.changeMenuValue();
    this.toggleSidebar.emit(this.isClose);
  }

}
