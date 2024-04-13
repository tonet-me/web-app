import {Component, DestroyRef, OnDestroy, OnInit} from '@angular/core';
import {StepModel} from "@shared/models/step.model";
import {CardManagementService} from "@app/modules/card-management/services/card-management.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {map, mergeMap} from "rxjs";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {BasicInfoComponent} from "@app/modules/card-management/pages/basic-info/basic-info.component";
import {SocialMediaComponent} from "@app/modules/card-management/pages/social-media/social-media.component";
import {cardManagementStepsGuard} from "@app/modules/card-management/guards/card-management-steps.guard";
import {
  ContactInformationComponent
} from "@app/modules/card-management/pages/contact-information/contact-information.component";
import {getAllCountriesResolver} from "@shared/resolver/get-all-countries.resolver";
import {ExtraLinkComponent} from "@app/modules/card-management/pages/extra-link/extra-link.component";

@Component({
  selector: 'app-card-management',
  templateUrl: './card-management.component.html',
  styleUrl: './card-management.component.scss'
})
export class CardManagementComponent implements OnDestroy, OnInit {
  constructor(private _cardManagementService: CardManagementService,
              private destroyRef: DestroyRef,
              private activeRoute: ActivatedRoute) {
  }

  breadCrumbData = {
    title: 'Add card',
    description: 'Generate and share customizable contact cards',
    backLink: 'defaultBrowser'
  }
  steps: StepModel[] = [
    {id: 1, name: 'basic info', link: 'basic-info'},
    {id: 2, name: 'social media', link: 'social-media'},
    {id: 3, name: 'contact information', link: 'contract-information'},
    {id: 4, name: 'extra link', link: 'extra-link'},
  ];

  ngOnInit() {
    this.activeRoute.data.pipe(takeUntilDestroyed(this.destroyRef), map((res) => res['cardData'])).subscribe(
      (res) => {
        if (res) {
          this._cardManagementService.cardStoreData.set(res)
          this._cardManagementService.savedName.set(res.name)
          this.breadCrumbData = {
            title: 'Edit card',
            description: 'Modify and share customizable contact cards',
            backLink: 'defaultBrowser'
          }
        }
      }
    )
  }

  ngOnDestroy() {
    this._cardManagementService.cardStoreData.set(null)
    this._cardManagementService.savedName.set(null)
  }
}
