import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {ModalComponent} from "@shared/component/modal/modal.component";
import {ImageCropperModule} from "ngx-image-cropper";
import {InlineSvgComponent} from "@shared/component/inline-svg/inline-svg.component";
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-confirm-modal',
  standalone: true,
  imports: [
    ModalComponent,
    ImageCropperModule,
    InlineSvgComponent,
    NgClass
  ],
  templateUrl: './confirm-modal.component.html',
  styleUrl: './confirm-modal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConfirmModalComponent {
  @Input() icon!: string;
  @Input() iconSize!: string;
  @Input() title!: string
  @Input() cancellationText: string = 'cancel'
  @Input() confirmationText!: string
  @Input() showModal!: boolean;
  @Output() showModalChange = new EventEmitter();
  @Input() isDelete!: boolean;
  @Output() onConfirm: EventEmitter<boolean> = new EventEmitter<boolean>();
}
