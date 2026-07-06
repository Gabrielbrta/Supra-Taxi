import { Component, input, output } from '@angular/core';
import { MatButtonAppearance, MatButtonModule } from '@angular/material/button';
import { Icons } from '../../icons/icons';
import { RouterLink } from '@angular/router';
import { LucideDynamicIcon } from '@lucide/angular';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-button',
  imports: [ MatButtonModule, RouterLink, LucideDynamicIcon, MatTooltipModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
})
export class ButtonComponent{
  labelButton = input<string | null>();
  icons = Icons;
  icon = input<keyof typeof Icons | null>();
  buttonType =  input<MatButtonAppearance>('filled');
  routerLink = input<string | null>(null);
  exportable = input<boolean | null>(null);
  disabled = input<boolean>();
  tooltip = input<string>();
  clicked = output<MouseEvent>();

  onClick(event: MouseEvent) {
    this.clicked.emit(event);
  }
}
