import { Component, input } from '@angular/core';
import { StatusEnum } from '../../enums/StatusEnum';
import { TipoMotoristaEnum } from '../../enums/TipoMotoristaEnum';

@Component({
  selector: 'app-badge',
  imports: [],
  templateUrl: './badge.component.html',
  styleUrl: './badge.component.scss',
})
export class BadgeComponent {
  status = input.required<StatusEnum | TipoMotoristaEnum>();
  diasFaltantes = input<number>();

  protected readonly StatusEnum = StatusEnum;
  protected readonly tipoMotoristaEnum = TipoMotoristaEnum;

  getLabel() : string {
    if(this.status() === StatusEnum.Critico) {
      return 'Vencido'
    } 
    else if(this.status() && this.diasFaltantes()) {
      return this.diasFaltantes() + 'd restantes'
    } 
    else {
      let status = this.status() === StatusEnum.Aprovado ? 'Aprovado' : 
                   this.status() === StatusEnum.Reprovado ? 'Reprovado' : 
                   this.status() === StatusEnum.Pendente ? 'Pendente' : 
                   this.status() === StatusEnum.Ativo ? 'Ativo' : 
                   this.status() === StatusEnum.Inativo ? 'Inativo' : 
                   this.status() === TipoMotoristaEnum.Motorista ? 'Motorista' : 'Associado'
                   return status
    }
  }
 }
