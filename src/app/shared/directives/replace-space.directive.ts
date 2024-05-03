import {Directive, ElementRef, HostListener} from '@angular/core';
import {NgControl} from "@angular/forms";

@Directive({
  selector: '[appReplaceSpace]',
  standalone: true
})
export class ReplaceSpaceDirective {

  constructor(
    private el: ElementRef,
    private control: NgControl,
  ) {
  }

  @HostListener('input', ['$event']) onInput() {
    const inputValue = this.control.value;
    this.el.nativeElement.value = inputValue.replace(/\s/g, '_');
  }

}
