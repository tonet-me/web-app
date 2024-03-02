import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {countryModel} from "@app/modules/settings/models/setting.model";
import {DomSanitizer} from "@angular/platform-browser";
import {ImageCroppedEvent, LoadedImage} from "ngx-image-cropper";

@Component({
  selector: 'app-personal-form',
  templateUrl: './personal-form.component.html',
  styleUrl: './personal-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PersonalFormComponent implements OnInit {
  @Input() form: any;
  @Input() countryList: countryModel[] = []
  @Input() userEmail?: string
  @Output() selectedCountryChange: EventEmitter<string> = new EventEmitter();
  @Output() onSubmit: EventEmitter<null> = new EventEmitter()
  @Output() onClose: EventEmitter<null> = new EventEmitter()

  ngOnInit() {
  }

  submit() {
    this.onSubmit.emit();
  }

  close() {
    this.onClose.emit();
  }

  onSelectedCountry(value: any) {
    this.selectedCountryChange.emit(value)

  }
}
