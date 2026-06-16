import { Component, input } from '@angular/core';
import { cardStatusType } from '../../models/cards/cardTypes';
import { Icons } from '../../icons/icons';
import { LucideAngularModule } from 'lucide-angular';
import { TableComponent } from "../table/table.component";


@Component({
  selector: 'app-card-info',
  imports: [LucideAngularModule],
  templateUrl: './card-info.component.html',
  styleUrl: './card-info.component.scss',
})
export class CardInfoComponent {
  protected readonly icons = Icons;
  typeIconStatus = input<keyof cardStatusType>();
  icon = input<keyof typeof Icons>();
  linkIcon = input<keyof typeof Icons>()
  title = input<string>();
  description = input<string>();
  stats = input<string>('0');
  statsIcon = input<keyof typeof Icons>();
  InteractiveIcon = input<keyof typeof Icons>();
}
