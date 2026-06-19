import { Component, input } from '@angular/core';
import { StatusEnum } from '../../enums/StatusEnum';

@Component({
  selector: 'app-badge',
  imports: [],
  templateUrl: './badge.component.html',
  styleUrl: './badge.component.scss',
})
export class BadgeComponent {
  status = input.required<StatusEnum>()
  diasFaltantes = input<number>();

  protected readonly StatusEnum = StatusEnum;

  getLabel() : string {
    if(this.status() === StatusEnum.Critico) {
      return 'Vencido'
    } 
    else if(this.status() && this.diasFaltantes()) {
      return this.diasFaltantes() + 'd restantes'
    } 
    else {
      let status = this.status() === StatusEnum.Aprovado ? 'Aprovado' : 
                   this.status() === StatusEnum.Reprovado ? 'Reprovado' : 'Pendente';
                   return status;
    }
  }
 }
