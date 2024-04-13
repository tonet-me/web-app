import {ResolveFn} from '@angular/router';
import {inject} from "@angular/core";
import {map, Observable} from "rxjs";
import {CardService} from "@shared/services/card.service";

export const userCardsResolver: ResolveFn<Observable<boolean>> = (route, state) => {
  const cardService = inject(CardService)
  return cardService.getCards().pipe(map((res) => {
    cardService.userCards = res.cards
    return true
  }))
};
