import {Component, DestroyRef, OnInit} from '@angular/core';
import {RxFormBuilder, RxFormGroup, RxwebValidators} from "@rxweb/reactive-form-validators";
import {BasicInfoForm} from "../../models/card-management.model";
import {ActivatedRoute, Router} from "@angular/router";
import {StepsService} from "@shared/services/steps.service";
import {CardManagementService} from "@app/modules/card-management/services/card-management.service";
import {CardActivationEnum} from "@shared/enums/card-activation.enum";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {debounceTime, distinctUntilChanged, filter, map, Observable, of, switchMap, tap} from "rxjs";
import {AsyncValidatorFn, ValidationErrors} from "@angular/forms";
import {custom_link_regex} from "@shared/helper/my-helper";

@Component({
  templateUrl: './basic-info.component.html',
  styleUrl: './basic-info.component.scss'
})
export class BasicInfoComponent implements OnInit {
  form!: RxFormGroup
  isExistName: boolean | null = null;

  constructor(private _fb: RxFormBuilder,
              private cardManagementService: CardManagementService,
              private stepsService: StepsService,
              private router: Router,
              private destroyRef: DestroyRef,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.stepsService.activeStepSubject$.next(1)
    const form = new BasicInfoForm(this.cardManagementService.cardStoreData()!);
    this.form = this._fb.formGroup(form) as RxFormGroup;
    const savedName = this.cardManagementService.savedName()
    this.form.controls['name'].valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      takeUntilDestroyed(this.destroyRef),
      tap(() => this.isExistName = null),
      filter((searchValue) => searchValue && searchValue.length >= 4 && searchValue.length <= 25 && custom_link_regex.test(searchValue)),
      switchMap((searchValue: string) => {
        if (savedName && savedName === searchValue) {
          return of({is_exist: false, value: searchValue})
        }
        return this.cardManagementService.checkUniqueNameCard(searchValue).pipe(
          map((data) => {
            return {is_exist: data.is_exist, value: searchValue}
          }),
        );
      }),
    ).subscribe(
      (data) => {
        this.isExistName = data.is_exist;
        this.form.get('name')?.setAsyncValidators([this.checkExistLink(data.is_exist)])
        this.form.get('name')?.updateValueAndValidity()
      }
    )
  }

  private checkExistLink(isExit: boolean): AsyncValidatorFn {
    return (): Observable<ValidationErrors | null> => {
      let bReturn: boolean = true;
      if (isExit) {
        bReturn = false;
      }
      let err: ValidationErrors = {'unique': {message: "Choose a unique name, this one\'s already in use"}};
      return bReturn ? of(null) : of(err);
    };
  }


  onSubmit() {
    if (this.form.valid) {
      this.cardManagementService.cardStoreData.update((res) => {
        return {
          ...res, ...this.form.value,
          status: this.form.value.status ? CardActivationEnum.active : CardActivationEnum.deactive
        }
      })
      this.router.navigate(['../social-media'], {relativeTo: this.activatedRoute}).then()
    }
  }
}
