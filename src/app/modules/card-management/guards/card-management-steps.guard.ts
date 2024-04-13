import {CanMatchFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {CardManagementService} from "@app/modules/card-management/services/card-management.service";
import {Location} from "@angular/common";

export const cardManagementStepsGuard: CanMatchFn = (route, url) => {
  const _cardManagementService = inject(CardManagementService);
  const router = inject(Router);
  const location = inject(Location)
  if(!_cardManagementService.cardStoreData()){
    location.replaceState('/')
    router.navigate(['card-management']).then()
  }
  return !!_cardManagementService.cardStoreData();
};
