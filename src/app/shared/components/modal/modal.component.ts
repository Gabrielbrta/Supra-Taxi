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
  disabled = input<boolean>(false);
  subtitle = input<string>();
  icons = Icons;
  toggle = input<boolean>();

  confirmClick = output();
  refuseClick = output();

  onConfirmClick() {
    this.confirmClick.emit();
  }
  onRefuseClick() {
    this.refuseClick.emit();
  }

}
