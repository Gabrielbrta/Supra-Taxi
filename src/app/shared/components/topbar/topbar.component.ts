import { Component, ElementRef, HostListener, output } from '@angular/core';

import { Icons } from '../../icons/icons';
import { MenuItemsComponent } from "../menu-items/menu-items.component";
import { MenuItem } from '../../models/menu/menuList';
import { LucideDynamicIcon } from '@lucide/angular';

@Component({
  selector: 'app-topbar',
  imports: [LucideDynamicIcon, MenuItemsComponent],
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.scss',
})
export class TopbarComponent{
  icons = Icons;
  profileName: string = "Jorge Aragão";
  profileMail: string = "jorge@jorge.com";
  isClosedMenu: boolean = true;

  constructor(
    private elementRef: ElementRef
  ) {}

  menuItems: MenuItem[] = [
      {
        profileName: this.profileName,
        profileMail: this.profileMail,
        label: 'Meu Perfil',
        path: '/configuracoes',
        icon: this.icons.LucideUser,
      },
      {
        label: 'Alterar Senha',
        path: '/configuracoes',
        icon: this.icons.LucideKeyRound,
      },
      {
        label: 'Preferências',
        path: '/configuracoes',
        icon: this.icons.LucideSettings,
      },
      {
        label: 'Sair',
        path: '/logout',
        icon: this.icons.LucideLogOut,
      }
    ];

  @HostListener('document:click', ['$event'])
    toggleMenu(event: Event ) {
      const clickedInside = this.elementRef.nativeElement.contains(event.target);

      clickedInside ? 
      this.isClosedMenu = false :
      this.isClosedMenu = true;
    }
}
