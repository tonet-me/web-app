import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {RxFormGroup} from "@rxweb/reactive-form-validators";

@Component({
  selector: 'app-basic-info-form',
  templateUrl: './basic-info-form.component.html',
  styleUrl: './basic-info-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BasicInfoFormComponent {
  @Input() form!: RxFormGroup;
  @Input() isExistName!: boolean | null;
  @Output() onSubmit: EventEmitter<null> = new EventEmitter<null>()

  submit() {
    this.onSubmit.emit()
  }
}
