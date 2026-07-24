import { Pipe, PipeTransform } from '@angular/core';
import { isString } from 'imask/esm/core/utils';

@Pipe({
  name: 'changeDataToBrasil',
})
export class ChangeDataToBrasilPipe implements PipeTransform {
  transform(data: Date | string): string {
    try {
      if(isString(data)) {
        return data;
      }else {
        const brazilData: Date = new Date(data); 
        return String(brazilData.toLocaleDateString('pt-BR'));
      }
    } catch(err) {
      return '00/00/0000';
    } 
     
  }
}
