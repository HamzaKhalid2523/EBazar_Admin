import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'absoluteNumber'})
export class AbsoluteNumberPipe implements PipeTransform {
  transform(num: number, args?: any): any {
    return Math.abs(num);
  }
}