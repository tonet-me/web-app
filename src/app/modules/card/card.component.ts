import {Component, DestroyRef, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {map, Observable} from "rxjs";
import {CardModel} from "@shared/models/card.model";
import {environment} from "@environments/environment";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {CardService} from "@shared/services/card.service";
import {CardActivationEnum} from "@shared/enums/card-activation.enum";
import {ToastrService} from "ngx-toastr";

@Component({
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent implements OnInit {
  userCard$!: Observable<CardModel>
  protected readonly environment = environment;

  constructor(private activeRoute: ActivatedRoute,
              private destroyRef: DestroyRef,
              private router: Router,
              private toastr: ToastrService,
              private cardService: CardService) {
  }

  ngOnInit() {
    this.userCard$ = this.activeRoute.data.pipe(map((res) => res['card']))
  }


  onChangeStatus(item: CardModel) {
    if (item.status === CardActivationEnum.active) {
      item.status = CardActivationEnum.deactive
    } else {
      item.status = CardActivationEnum.active
    }
    this.cardService.changeStatusCard(item.status, item.id).pipe(
      takeUntilDestroyed(this.destroyRef),
    ).subscribe()
  }

  onDeletedCard(id: string) {
    this.cardService.deleteCard(id).pipe(
      takeUntilDestroyed(this.destroyRef),
    ).subscribe(
      () => {
        this.toastr.success('Card Deleted Successfully')
        this.router.navigate(['']).then()
      }
    )
  }
}
