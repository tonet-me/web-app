import {Component, DestroyRef, OnInit} from '@angular/core';
import {UserService} from "@shared/services/user.service";
import {CardActivationEnum} from "@shared/enums/card-activation.enum";
import {CardModel} from "@shared/models/card.model";
import {CardService} from "@shared/services/card.service";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {map, mergeMap} from "rxjs";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent implements OnInit {
  constructor(protected userService: UserService,
              protected cardService: CardService,
              private destroyRef: DestroyRef) {
  }

  ngOnInit() {

  }


  onChangeCardStatus(item: CardModel) {
    if (item.status === CardActivationEnum.active) {
      item.status = CardActivationEnum.deactive
    } else {
      item.status = CardActivationEnum.active
    }
    this.cardService.changeStatusCard(item.status, item.id).pipe(
      takeUntilDestroyed(this.destroyRef),
    ).subscribe(
      () => {
      }
    )
  }

  onDeleteCard(id: string) {
    this.cardService.deleteCard(id).pipe(
      takeUntilDestroyed(this.destroyRef),
      mergeMap(() => this.cardService.getUserCards$().pipe(
        map((res) => {
          this.cardService.userCards = res?.filter(a => a.id !== id)!
          return true
        })
      )),
    ).subscribe()
  }
}
