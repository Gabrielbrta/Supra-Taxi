import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'changeDataToBrasil',
})
export class ChangeDataToBrasilPipe implements PipeTransform {
  transform(data: Date): string {
    try {
      const brazilData: Date = new Date(data); 
      return String(brazilData.toLocaleDateString('pt-BR'));
    } catch(err) {
      console.error(err)
      return '00/00/0000';
    } 
     
  }
}
