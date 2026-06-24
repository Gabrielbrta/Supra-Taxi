import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'telefone',
})
export class TelefonePipe implements PipeTransform {
  transform(tel: string): string {
    if(!tel) return '';

    const telValue = String(tel).replace(/\D/g, '');

    if(telValue.length < 10) return String(tel);
    if(telValue.length > 11) return String(tel);

    const celphone = telValue.replace( /(\d{2})(\d{5})(\d{4})/, '($1) $2-$3'); 
    const phone = telValue.replace( /(\d{2})(\d{4})(\d{4})/, '($1)$2-$3');

    return telValue.length == 11 ? celphone : phone;
  }
}
