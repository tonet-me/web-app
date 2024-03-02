import {Directive, HostListener, Input} from '@angular/core';
import {markFormGroupTouched} from "@shared/helper/my-helper";
import {RxFormGroup} from "@rxweb/reactive-form-validators";

@Directive({
  selector: '[appFormSubmit]',
  standalone: true
})
export class FormSubmitDirective {

  @Input() formGroup!: RxFormGroup;

  constructor() {
  }

  @HostListener('submit') onSubmit() {
    markFormGroupTouched(this.formGroup)
  }

}
