import { Component, computed, input, output, signal } from '@angular/core';
import { Icons } from '../../icons/icons';
import { LucideDynamicIcon } from '@lucide/angular';

@Component({
  selector: 'app-button-approval',
  imports: [LucideDynamicIcon],
  templateUrl: './button-approval.component.html',
  styleUrl: './button-approval.component.scss',
})
export class ButtonApprovalComponent {
  click = output();
  status = input.required<'approval' | 'reproved'>();
  title = input<string>('');
  disabled = input<boolean>(false);
  description = input<string>('');
  selected = input<boolean | null>(null);
  icons = Icons;
  
  actualSelected = computed(() => {
    if(this.selected() === false && this.selected() !== null) {
      return false;
    } 

    if(this.selected() === true && this.selected() !== null) {
      return true;
    }

    return null
  });
  
  onClick() {
    this.click.emit()
  }
}
