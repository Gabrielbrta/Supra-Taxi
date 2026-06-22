import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortName',
})
export class ShortNamePipe implements PipeTransform {
  transform(name: string): string {
    let nameParts: string[] = String(name).split(' ');

    if(nameParts.length > 1) {
      return `${nameParts[0]} ${nameParts[nameParts.length - 1]}` ;
    } else {
      return nameParts[0] ?? '';
    }
  }
}
