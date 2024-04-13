import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class StepsService {
  activeStepSubject$: BehaviorSubject<number | undefined> = new BehaviorSubject<number | undefined>(undefined);

  constructor() {
  }
}
