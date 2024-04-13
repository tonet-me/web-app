import { ResolveFn } from '@angular/router';
import {inject} from "@angular/core";
import {CardService} from "@shared/services/card.service";
import {map} from "rxjs";
import {CardModel} from "@shared/models/card.model";

export const singleCardInfoResolver: ResolveFn<CardModel> = (route, state) => {
  const cardService = inject(CardService)
  return cardService.getSingleCard(route.params['id']).pipe(map((res) => res.card));
}
