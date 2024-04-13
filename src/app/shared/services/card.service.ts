import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CardActivationEnum} from "@shared/enums/card-activation.enum";
import {CardModel} from "@shared/models/card.model";
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CardService {
  private _userCards = new BehaviorSubject<CardModel[] | null>(null);
  private _userCards$: Observable<CardModel[] | null> = this._userCards.asObservable();

  constructor(private http: HttpClient) {
  }


  getCards() {
    return this.http.get<{ cards: CardModel[] }>('cards')
  }


  get userCards(): BehaviorSubject<CardModel[] | null> {
    return this._userCards
  }

  set userCards(cards: CardModel[] | null) {
    this._userCards.next(cards)
  }


  getUserCards$(): Observable<CardModel[] | null> {
    return this._userCards$
  }

  changeStatusCard(active: CardActivationEnum, id: string) {
    return this.http.put(`cards/${active === CardActivationEnum.active ? 'active' : 'de-active'}/${id}`, {})
  }

  getSingleCard(id: number) {
    return this.http.get<{ card: CardModel }>(`cards/${id}`)
  }

  deleteCard(id: string) {
    return this.http.delete<boolean>(`cards/${id}`)
  }

}
