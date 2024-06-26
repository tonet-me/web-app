import {Component, DestroyRef, OnDestroy, OnInit} from '@angular/core';
import {StepModel} from "@shared/models/step.model";
import {CardManagementService} from "./services/card-management.service";
import {ActivatedRoute} from "@angular/router";
import {map} from "rxjs";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";

@Component({
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
