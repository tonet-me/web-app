import {
  AfterViewInit, ChangeDetectorRef,
  Directive,
  ElementRef, Input,
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
  @Input() showError?: boolean = true;
  @Input() showClearIcon?: boolean = true;
  subscription!: Subscription
  stateError!: string;

  constructor(private el: ElementRef,
              private control: NgControl,
              private cdr: ChangeDetectorRef,
              private renderer: Renderer2) {
  }

  ngAfterViewInit() {
    const formFiledElement = this.renderer.selectRootElement(this.el.nativeElement).parentElement
    this._updateFormField(formFiledElement, false)
    this.subscription = this.control.control!.statusChanges.subscribe((status) => {
      this._updateFormField(formFiledElement)
    });
  }


  private _updateFormField(formFieldElement: HTMLElement, firstInit = true): void {
    const value = this.control.value;
    if (value && this.showClearIcon) {
      this._showIcon(formFieldElement);
    } else {
      this._removeIcon(formFieldElement);
    }
    if (firstInit){
    if (this.control.invalid && this.showError) {
      this._showError(formFieldElement);
    } else {
      this._removeError(formFieldElement);
    }
    }
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
