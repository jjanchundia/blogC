import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'titulo'
})
export class TituloPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
