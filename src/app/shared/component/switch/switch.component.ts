import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-switch',
  standalone: true,
  imports: [
    FormsModule,
    NgIf
  ],
  templateUrl: './switch.component.html',
  styleUrl: './switch.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SwitchComponent {
  @Input() label? :string
  @Input() status!: boolean;
  @Output() statusChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  changed(event: Event) {
    if ((event.target as HTMLInputElement).checked) {
      this.statusChange.emit(true);
    } else {
      this.statusChange.emit(false);
    }
  }

}
