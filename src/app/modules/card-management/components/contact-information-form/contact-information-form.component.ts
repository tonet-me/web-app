import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {RxFormGroup} from "@rxweb/reactive-form-validators";
import {FormArray, FormGroup} from "@angular/forms";
import {countryModel} from "@shared/models/location.model";

@Component({
  selector: 'app-contact-information-form',
  templateUrl: './contact-information-form.component.html',
  styleUrl: './contact-information-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactInformationFormComponent {
  @Input() form!: RxFormGroup;
  @Input() countryList: countryModel[] = []
  @Output() selectedCountryChange: EventEmitter<string> = new EventEmitter();
  @Output() onSubmit: EventEmitter<string> = new EventEmitter();
  @Output() onAddFormControl: EventEmitter<'phoneNumbers' | 'emails'> = new EventEmitter();
  @Output() onRemoveFormControl: EventEmitter<{name: 'phoneNumbers' | 'emails', index: number}> = new EventEmitter();
  getFormArray(name: string): FormGroup[] {
    let formArray = this.form.controls[name] as FormArray;
    return formArray.controls as FormGroup[];
  }
  addToForm(name: 'phoneNumbers' | 'emails') {
    this.onAddFormControl.emit(name)
  }

  removeFromArray(name: 'phoneNumbers' | 'emails' , index: number) {
    this.onRemoveFormControl.emit({name, index})
  }


  submit() {
    this.onSubmit.emit()
  }

  onSelectedCountry(value: string) {
    this.selectedCountryChange.emit(value)
  }
}
