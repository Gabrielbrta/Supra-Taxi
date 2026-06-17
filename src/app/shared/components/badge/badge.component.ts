import { Component, input } from '@angular/core';
import { StatusDocumento } from '../../enums/StatusDocumentoEnum';

@Component({
  selector: 'app-badge',
  imports: [],
  templateUrl: './badge.component.html',
  styleUrl: './badge.component.scss',
})
export class BadgeComponent {
  status = input.required<StatusDocumento>()
  diasFaltantes = input<number>();

  protected readonly StatusDocumento = StatusDocumento;


  getLabel() : string {
    if(this.status() === StatusDocumento.Critico) {
      return 'Vencido'
    } else {
      return this.diasFaltantes() + 'd restantes'
    }
  }
 }
