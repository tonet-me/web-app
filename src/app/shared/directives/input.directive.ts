import {
  AfterViewInit, ChangeDetectorRef,
  Directive,
  ElementRef,
  OnDestroy,
  Renderer2
} from '@angular/core';
import {NgControl} from "@angular/forms";
import {Subscription} from "rxjs";

@Directive({
  selector: '[appInput]',
  standalone: true
})
export class InputDirective implements OnDestroy, AfterViewInit {

  subscription!: Subscription
  stateError!: string;

  constructor(private el: ElementRef,
              private control: NgControl,
              private cdr: ChangeDetectorRef,
              private renderer: Renderer2) {
  }

  ngAfterViewInit() {
    const formFiledElement = this.renderer.selectRootElement(this.el.nativeElement).offsetParent
    const value = this.control.value
    if (value) {
      this._showIcon(formFiledElement)
    } else {
      this._removeIcon(formFiledElement)
    }
    this.subscription = this.control.statusChanges!.subscribe((status) => {
      const value = this.control.value
      if (value) {
        this._showIcon(formFiledElement)
      } else {
        this._removeIcon(formFiledElement)
      }
      if (status === 'INVALID') {
        this._showError(formFiledElement)
      } else {
        this._removeError(formFiledElement)
      }
    });
  }

  private _showError(formFiledElement: HTMLElement) {
    const errorElement = this.renderer.createElement('small');
    this.renderer.addClass(errorElement, 'error')
    this.renderer.setProperty(errorElement, 'innerText', Object.values(this.control.errors!)[0].message)
    if (this.renderer.selectRootElement(this.el.nativeElement).offsetParent?.lastChild.localName !== 'small') {
      this.renderer.appendChild(formFiledElement, errorElement);
    } else {
      if (Object.values(this.control.errors!)[0].message !== this.stateError) {
        this.renderer.removeChild(formFiledElement, this.renderer.selectRootElement(this.el.nativeElement).offsetParent?.lastChild);
        this.renderer.appendChild(formFiledElement, errorElement);
        this.stateError = Object.values(this.control.errors!)[0].message
      }
    }
  }

  private _removeError(formFiledElement: HTMLElement) {
    if (this.renderer.selectRootElement(this.el.nativeElement).offsetParent?.lastChild.localName === 'small') {
      this.renderer.removeChild(formFiledElement, this.renderer.selectRootElement(this.el.nativeElement).offsetParent?.lastChild);
    }
  }

  private _showIcon(formFiledElement: HTMLElement) {
    const iconElement = this.renderer.createElement('i');
    this.renderer.addClass(iconElement, 'icon')
    this.renderer.setProperty(iconElement, 'innerHTML', '&#x2715')
    this.renderer.listen(iconElement, 'click', () => {
      this.control.control?.patchValue('')
      this.control.control?.markAsTouched()
      this.cdr.markForCheck()

    })
    if (this.renderer.selectRootElement(this.el.nativeElement).offsetParent?.firstChild.localName !== 'i') {
      this.renderer.insertBefore(formFiledElement, iconElement, formFiledElement.firstChild);
    }
  }

  private _removeIcon(formFiledElement: HTMLElement) {
    if (this.renderer.selectRootElement(this.el.nativeElement).offsetParent?.firstChild.localName === 'i') {
      this.renderer.removeChild(formFiledElement, this.renderer.selectRootElement(this.el.nativeElement).offsetParent?.firstChild);
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }
}
