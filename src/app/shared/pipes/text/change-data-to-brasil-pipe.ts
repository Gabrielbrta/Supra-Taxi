import { Pipe, PipeTransform } from '@angular/core';
import moment, { Moment } from 'moment';

@Pipe({
  name: 'changeDataToBrasil',
})
export class ChangeDataToBrasilPipe implements PipeTransform {
  transform(data: Date | string | Moment | null | undefined): string {
    try {
      if (!data) {
        return '00/00/0000';
      }

      const parsedDate = moment.isMoment(data)
        ? data
        : moment(data, [moment.ISO_8601, 'DD/MM/YYYY', 'YYYY-MM-DD'], true);

      if (parsedDate.isValid()) {
        return parsedDate.format('DD/MM/YYYY');
      }

      const fallbackDate = moment(data);
      return fallbackDate.isValid()
        ? fallbackDate.format('DD/MM/YYYY')
        : '00/00/0000';
    } catch (err) {
      return '00/00/0000';
    }
  }
}
