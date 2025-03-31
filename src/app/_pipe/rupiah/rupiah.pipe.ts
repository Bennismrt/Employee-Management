import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'rupiah'
})
export class RupiahPipe implements PipeTransform {

  public transform(value: number): string {
    value = value && value > 0 ? value : 0;

    return 'Rp ' + new Intl.NumberFormat('id-ID', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value / 10);
  }

}
