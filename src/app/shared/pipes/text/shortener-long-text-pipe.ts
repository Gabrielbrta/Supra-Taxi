import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortenerLongText',
})
export class ShortenerLongTextPipe implements PipeTransform {
  transform(name: string): string {
    const limit = 20;
    if(name.length > limit) {
      return name.slice(0, limit) + '...';
    } else {
      return name;
    }
  }
}
