import {FormControl, FormGroup} from "@angular/forms";
import {ReactiveFormConfig} from "@rxweb/reactive-form-validators";

export function markFormGroupTouched(formGroup: FormGroup) {
  (<any>Object).values(formGroup.controls).forEach((control: FormControl) => {
    control.markAsTouched();
    control.updateValueAndValidity()
  });
}

export function setFormConfig() {
  ReactiveFormConfig.set({
    "internationalization": {
      "dateFormat": "dmy",
      "seperator": "/"
    },
    "validationMessage": {
      "alpha": "Only alphabelts are allowed.",
      "numeric": "Only numbers are allowed.",
      "alphaNumeric": "Only alphabet and numbers are allowed.",
      "compare": "inputs are not matched.",
      "digit": "Only digit are allowed",
      "email": "email is not valid",
      "lowerCase": "Only lowercase is allowed",
      "maxLength": "maximum length is {{1}} digit",
      "maxNumber": "enter value less than equal to {{1}}",
      "minNumber": "enter value greater than equal to {{1}}",
      "password": "please enter valid password",
      "required": "this field is required",
      "time": "Only time format is allowed",
      "upperCase": "Only uppercase is allowed",
      "url": "Only url format is allowed",
      "zipCode": "enter valid zip code",
      "minLength": "minimum length is {{1}} digit"
    }
  });
}
