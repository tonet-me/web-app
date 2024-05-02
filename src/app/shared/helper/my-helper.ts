import {FormArray, FormGroup} from "@angular/forms";

export function markFormGroupTouched(formGroup: FormGroup | FormArray) {
  Object.values(formGroup.controls).forEach((control) => {
    if (control instanceof FormGroup) {
      markFormGroupTouched(control); // Recursively mark FormGroup controls
    } else if (control instanceof FormArray) {
      markFormGroupTouched(control); // Recursively mark FormArray controls
    } else {
        control.markAsTouched();
        control.updateValueAndValidity();
    }
  });
}

export const custom_link_regex: RegExp = new RegExp('^[a-zA-Z0-9]+(?:[_.][a-zA-Z0-9]+)*$');
