import { Component } from '@angular/core';
import { MenuItem } from '../../models/menu/menuList';
import { Icons } from '../../icons/icons';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-menu-items',
  imports: [RouterLink, RouterLinkActive, LucideAngularModule],
  templateUrl: './menu-items.component.html',
  styleUrl: './menu-items.component.scss',
})
export class MenuItemsComponent {
  
  private icons = Icons;
  Items: MenuItem[] = [
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

  handleClick($event: any) {
    console.log($event.target);
  }
}