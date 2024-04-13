import {
  AfterContentInit,
  Directive,
  ElementRef, Input, Renderer2,
} from '@angular/core';

@Directive({
  selector: '[appPrefix]',
  standalone: true
})
export class FormPrefixDirective implements AfterContentInit {
  @Input() prefix: string = '';


  constructor(private el: ElementRef, private renderer: Renderer2) {

  }

  ngAfterContentInit() {
    const prefixElement = this.renderer.createElement('span');
    this.renderer.addClass(prefixElement, 'prefix')
    this.renderer.setProperty(prefixElement, 'innerText', this.prefix)
    this.el.nativeElement.parentElement.appendChild(prefixElement)
    this.renderer.setStyle(this.el.nativeElement, 'padding-left', `${prefixElement.clientWidth + 16}px`);
  }


}
