import { Component, input, output } from '@angular/core';
import { LucideDynamicIcon } from '@lucide/angular';
import { Icons } from '../../icons/icons';
import { ButtonComponent } from "../button/button.component";

@Component({
  selector: 'app-modal',
  imports: [LucideDynamicIcon, ButtonComponent],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
})
export class ModalComponent {

  status = input<'warn' | 'success' | 'error' | 'info'>();
  type = input<'confirm' | 'custom'>('confirm');
  message = input<string>('');
  title = input<string>();
  subtitle = input<string>();
  icons = Icons;
  toggle = input<boolean>();

  confirmClick = output<MouseEvent>();
  refuseClick = output<MouseEvent>();

  onConfirmClick(event: MouseEvent) {
    this.confirmClick.emit(event);
  }
  onRefuseClick(event: MouseEvent) {
    this.refuseClick.emit(event);
  }

}
