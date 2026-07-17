import { Component, input } from '@angular/core';
import { CardComponent } from '../card/card.component';
import { InputComponent } from '../forms/input/input.component';
import { InputSelectComponent } from '../forms/input-select/input-select.component';
import { Icons } from '../../icons/icons';
import { LucideDynamicIcon } from '@lucide/angular';

@Component({
  selector: 'app-card-form-block',
  imports: [CardComponent, LucideDynamicIcon],
  templateUrl: './card-form-block.component.html',
  styleUrl: './card-form-block.component.scss',
})
export class CardFormBlockComponent {
  Icons = Icons;
  icon = input<keyof typeof Icons>();
  title = input<string>('');
  description = input<string>('');
}
