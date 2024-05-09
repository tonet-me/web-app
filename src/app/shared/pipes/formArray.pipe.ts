import {Pipe, PipeTransform} from '@angular/core';
import {environment} from "@environments/environment";
import {FormArray, FormGroup} from "@angular/forms";
import {RxFormGroup} from "@rxweb/reactive-form-validators";

@Pipe({
  name: 'formArray',
  standalone: true
})
export class FormArrayPipe implements PipeTransform {

  transform(form: RxFormGroup, formControlName: string): RxFormGroup[] {
    let formArray = form.controls[formControlName] as FormArray;
    return formArray.controls as RxFormGroup[];
  }

}
