import { Component, EventEmitter, output, Output } from '@angular/core';
import { Icons } from '../../icons/icons';
import { LucideAngularModule } from 'lucide-angular';
import { MenuItemsComponent } from '../menu-items/menu-items.component';
import { MenuItem } from '../../models/menu/menuList';

@Component({
  selector: 'app-sidebar',
  imports: [LucideAngularModule, MenuItemsComponent ],
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
      icon: this.icons.LayoutDashboard,
      children: []
    },
    {
      name: null,
      label: 'Motoristas',
      path: '/motoristas',
      icon: this.icons.Car,
      children: []
    },
    {
      name: null,
      label: 'Associados',
      path: '/associados',
      icon: this.icons.Users,
      children: []
    },
    {
      name: null,
      label: 'Vistorias',
      path: '/vistorias',
      icon: this.icons.ClipboardCheck,
      children: []
    },
    {
      name: null,
      label: 'Unidades',
      path: '/unidades',
      icon: this.icons.ListOrdered,
      children: []
    },
    {
      name: null,
      label: 'Ocorrências',
      path: '/ocorrencias',
      icon: this.icons.OctagonAlert,
      children: []
    },
    {
      name: null,
      label: 'Banidos',
      path: '/banidos',
      icon: this.icons.Ban,
      children: []
    },
    {
      name: null,
      label: 'Usuários',
      path: '/usuarios',
      icon: this.icons.UserCog,
      children: []
    },
    {
      name: null,
      label: 'Configurações',
      path: '/configuracoes',
      icon: this.icons.Settings,
      children: []
    }
  ];

  
  toggleClose() {
    this.isClose = !this.isClose;
    this.changeMenuValue();
    this.toggleSidebar.emit(this.isClose);
  }

}
