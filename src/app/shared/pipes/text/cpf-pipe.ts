import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cpf',
})
export class CpfPipe implements PipeTransform {
  transform(cpf: string): string {
    if(!cpf) return '';

    const cpfValue = String(cpf).replace(/\D/g, '');

    if(cpfValue.length !== 11) return String(cpf);

    return cpfValue.replace( /(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  }
}
