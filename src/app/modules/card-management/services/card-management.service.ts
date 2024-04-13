import {Injectable, signal, WritableSignal} from '@angular/core';
import {cardManagementPayload} from "@app/modules/card-management/models/card-management.model";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CardManagementService {

  cardStoreData: WritableSignal<cardManagementPayload | null> = signal(null);
  savedName: WritableSignal<string  | null> = signal(null);

  constructor(private http: HttpClient) {
  }

  addCard(payload: cardManagementPayload) {
    return this.http.post<boolean>('cards', {create_data: payload})
  }

  modifyCard(cardId: string, payload: cardManagementPayload) {
    return this.http.put<boolean>('cards', {update_data: payload, card_id: cardId})
  }

  checkUniqueNameCard(name: string) {
    return this.http.get<{is_exist: boolean}>(`cards/is-exist/${name}`)
  }

}
