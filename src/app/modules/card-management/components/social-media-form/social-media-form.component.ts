import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {RxFormGroup} from "@rxweb/reactive-form-validators";

@Component({
  selector: 'app-social-media-form',
  templateUrl: './social-media-form.component.html',
  styleUrl: './social-media-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SocialMediaFormComponent {
  @Input() form!: RxFormGroup
  @Output() onSubmit: EventEmitter<null> = new EventEmitter<null>()
  @Output() socialMediaToggled: EventEmitter<{
    item: RxFormGroup,
    inputField: HTMLInputElement
  }> = new EventEmitter()

  submit() {
    this.onSubmit.emit()
  }

  toggle(item: RxFormGroup, inputField: HTMLInputElement) {
    this.socialMediaToggled.emit({item, inputField})
  }

}
