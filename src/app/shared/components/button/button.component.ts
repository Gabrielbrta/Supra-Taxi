import { Component, input, output } from '@angular/core';
import { MatButtonAppearance, MatButtonModule } from '@angular/material/button';
import{MatBadgeModule} from "@angular/material/badge";
import { LucideAngularModule } from 'lucide-angular';
import { Icons } from '../../icons/icons';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-button',
  imports: [LucideAngularModule, MatButtonModule, RouterLink],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
})
export class ButtonComponent {
  labelButton = input<string | null>();
  icons = Icons;
  icon = input<keyof typeof Icons | null>('Plus');
  buttonType =  input<MatButtonAppearance>('filled');
  routerLink = input<string | null>(null);
  exportable = input<boolean | null>(null);
  clicked = output<MouseEvent>();
  
  onClick(event: MouseEvent) {
    this.clicked.emit(event);
  }
}
