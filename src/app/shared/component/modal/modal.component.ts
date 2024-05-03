import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Inject,
  Input, OnChanges,
  Output
} from '@angular/core';
import {DOCUMENT, NgClass, NgIf} from "@angular/common";

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
export class ModalComponent implements OnChanges {
  @Input() heightSize: string = "55";
  @Input() showModal!: boolean;
  @Input() closeable = true;
  @Input() size: 'lg' | 'md' | 'sm' = 'md';
  @Output() showModalChange: EventEmitter<boolean> = new EventEmitter();

  constructor(@Inject(DOCUMENT) private document: Document) {

  }

  ngOnChanges() {
    if (this.showModal) {
      this.document.body.style.overflowY = 'hidden';
    } else {
      this.document.body.style.overflowY = 'auto'
    }
  }

  close() {
    this.showModalChange.emit(false);
  }

}
