import {ChangeDetectionStrategy, Component, DestroyRef, Input, OnDestroy, OnInit} from '@angular/core';

import {BehaviorSubject} from "rxjs";
import {StepsService} from "@shared/services/steps.service";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {StepModel} from "@shared/models/step.model";
import { RouterLink, RouterLinkActive} from "@angular/router";
import {AsyncPipe, NgClass, NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-step-navigation',
  templateUrl: './step-navigation.component.html',
  styleUrls: ['./step-navigation.component.scss'],
  standalone: true,
  imports: [
    RouterLink,
    NgIf,
    NgClass,
    NgForOf,
    AsyncPipe,
    RouterLinkActive
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StepNavigationComponent implements OnInit, OnDestroy {

  @Input() steps!: StepModel[];
  activeStepIdSubject$: BehaviorSubject<number | undefined> = new BehaviorSubject<number | undefined>(undefined);
  activeStepId$ = this.activeStepIdSubject$.asObservable();

  constructor(private stepsService: StepsService,
              private destroyRef: DestroyRef) {

  }

  ngOnInit(): void {
    this.stepsService.activeStepSubject$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(res => {
        if (res) {
          this.activeStepIdSubject$.next(res);
        }
      });
  }

  ngOnDestroy(): void {
    this.activeStepIdSubject$.next(undefined);
  }
}
