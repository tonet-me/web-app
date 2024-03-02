import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {NgClass, NgIf} from "@angular/common";

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [
    NgIf,
    NgClass
  ],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModalComponent {
  @Input() heightSize: any = 55;
  @Input() showModal!: boolean;
  @Input() closeable = true;
  @Input() size: 'lg' | 'md' | 'sm' = 'md';
  @Output() showModalChange = new EventEmitter();

  constructor() {
  }

  close() {
    this.showModalChange.emit(false);
  }

}
