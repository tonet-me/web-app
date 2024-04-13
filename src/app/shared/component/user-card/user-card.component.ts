import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {ConfirmModalComponent} from "@shared/component/confirm-modal/confirm-modal.component";
import {CardActivationEnum} from "@shared/enums/card-activation.enum";
import {environment} from "@environments/environment";
import {DatePipe, NgClass, NgIf} from "@angular/common";
import {GetImageUrlPipe} from "@shared/pipes/get-image-url.pipe";
import {InlineSvgComponent} from "@shared/component/inline-svg/inline-svg.component";
import {QRCodeModule} from "angularx-qrcode";
import {SwitchComponent} from "@shared/component/switch/switch.component";
import {CardModel} from "@shared/models/card.model";
import {Router} from "@angular/router";
import {ClickOutsideDirective} from "@shared/directives/click-outside.directive";

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [
    ConfirmModalComponent,
    DatePipe,
    GetImageUrlPipe,
    InlineSvgComponent,
    NgIf,
    QRCodeModule,
    SwitchComponent,
    NgClass,
    ClickOutsideDirective
  ],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserCardComponent {
  @Input() card!: CardModel
  @Input() showSecondRow: boolean = true;
  @Input() btnPermission?: { detail: boolean; edit: boolean; delete: boolean } = {detail: true, edit: true, delete: true}
  @Output() onChangeCardStatus: EventEmitter<string> = new EventEmitter()
  @Output() onDeleteCard: EventEmitter<string> = new EventEmitter();
  protected showConfirmModal: boolean = false;
  protected readonly CardActivationEnum = CardActivationEnum;
  protected readonly environment = environment;

  constructor(private router: Router) {
  }

  changeCardStatus(cardId: string) {
    this.onChangeCardStatus.emit(cardId)
  }


  deleteCard(id: string) {
    this.showConfirmModal = false;
    this.onDeleteCard.emit(id)
  }

  onEditData(id: string) {
    this.router.navigate([`card-management/${id}/basic-info`]).then()
  }

  onSeeDetails(id: string) {
    this.router.navigate([`card/${id}`]).then()
  }
}
