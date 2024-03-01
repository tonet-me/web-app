import {ChangeDetectionStrategy, Component, Input} from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonComponent {
@Input() title! :string;
@Input() disabled: boolean = false;
@Input() setClass?: string;
@Input() type: string = 'button';
  submit() {

  }
}
