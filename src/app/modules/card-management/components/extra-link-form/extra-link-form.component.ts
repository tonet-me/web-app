import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {RxFormGroup} from "@rxweb/reactive-form-validators";
import {FormArray, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-extra-link-form',
  templateUrl: './extra-link-form.component.html',
  styleUrl: './extra-link-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExtraLinkFormComponent {
  @Input() form!: RxFormGroup;
  @Input() submitBtnText: string = 'Confirm and Create Card'
  @Output() onSubmit: EventEmitter<string> = new EventEmitter();
  @Output() onAddFormControl: EventEmitter<void> = new EventEmitter();
  @Output() onRemoveFormControl: EventEmitter<number> = new EventEmitter();

  addToForm() {
    this.onAddFormControl.emit()
  }

  removeFromArray(index: number) {
    this.onRemoveFormControl.emit(index)
  }

  submit() {
    this.onSubmit.emit()
  }
}
