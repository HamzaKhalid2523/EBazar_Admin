import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: 'input[numberRange]'
})
export class NumberRangeDirective {

  constructor(private _el: ElementRef) { }

  @HostListener('input', ['$event']) onInputChange(event) {
    const initalValue = this._el.nativeElement.value;
    this._el.nativeElement.value = initalValue.replace(/[^0-9]*/g, '');
    if ( initalValue !== this._el.nativeElement.value) {
      event.stopPropagation();
    } else if(this._el.nativeElement.value < 0 || this._el.nativeElement.value > 5000) {
      this._el.nativeElement.value = this._el.nativeElement.value.slice(0, -1);
    }
  }
}