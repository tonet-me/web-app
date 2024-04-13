import {Directive, ElementRef, HostListener} from '@angular/core';

@Directive({
  selector: '[appReplaceSpace]',
  standalone: true
})
export class ReplaceSpaceDirective {

  constructor(private el: ElementRef) { }

  @HostListener('input', ['$event']) onInput(event: any) {
    const inputValue: string = event.target.value;
    this.el.nativeElement.value = inputValue.replace(/\s/g, '_');
  }

}
