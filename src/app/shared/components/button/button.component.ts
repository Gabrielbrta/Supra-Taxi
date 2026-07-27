import { Component, input, output, computed } from '@angular/core';
import { MatButtonAppearance, MatButtonModule } from '@angular/material/button';
import { Icons } from '../../icons/icons';
import { RouterLink } from '@angular/router';
import { LucideDynamicIcon } from '@lucide/angular';
import { MatTooltipModule } from '@angular/material/tooltip';

export type ButtonColor = 'primary' | 'danger' | 'success' | 'warn' | 'info' | 'neutral' | 'ghost';

@Component({
  selector: 'app-button',
  imports: [MatButtonModule, RouterLink, LucideDynamicIcon, MatTooltipModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
})
export class ButtonComponent {
  // ===== Inputs existentes (mantidos para compatibilidade) =====
  labelButton = input<string | null>();
  icons = Icons;
  icon = input<keyof typeof Icons | null>();
  buttonType = input<MatButtonAppearance>('filled');
  routerLink = input<string | null>(null);
  exportable = input<boolean | null>(null);
  disabled = input<boolean>();
  tooltip = input<string>();
  clicked = output<MouseEvent>();

  // ===== NOVO: input de cor (default 'primary' para não quebrar existentes) =====
  color = input<ButtonColor>('primary');

  // ===== Computed: gera a classe CSS baseada na cor + tipo =====
  colorClass = computed(() => {
    const color = this.color();
    const type = this.buttonType();

    if (color === 'ghost') {
      return 'ghost-button';
    }
    
    return `${color}-button--${type}`;
  });

  onClick(event: MouseEvent) {
    this.clicked.emit(event);
  }
}