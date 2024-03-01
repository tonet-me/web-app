import {Component, DestroyRef, OnInit} from '@angular/core';
import {RxFormBuilder, RxFormGroup} from "@rxweb/reactive-form-validators";
import {markFormGroupTouched} from "@shared/helper/my-helper";
import {ActivatedRoute, Params, Router} from '@angular/router';
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {iif, map, mergeMap, of} from "rxjs";
import {countryModel, PersonalInfoForm} from "@app/modules/settings/models/setting.model";
import {SettingService} from "@app/modules/settings/services/setting.service";
import {UserService} from "@shared/services/user.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-modify-personal-info',
  templateUrl: './modify-personal-info.component.html',
  styleUrl: './modify-personal-info.component.scss'
})
export class ModifyPersonalInfoComponent implements OnInit {
  form!: any;
  countryList: countryModel[] = []
  userEmail!: string;
  new_user: boolean = false
  breadCrumbData = {title: 'Personal info', description: 'Enter your personal info', backLink: '/setting'}

  constructor(private _fb: RxFormBuilder,
              private router: Router,
              private destroyRef: DestroyRef,
              private settingService: SettingService,
              private toast: ToastrService,
              private activatedRoute: ActivatedRoute,
              private userService: UserService
  ) {
  }

  ngOnInit() {
    this.activatedRoute.queryParams.pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(
      (param: Params) => {
        this.new_user = param['new_user']
        if (this.new_user) {
          this.breadCrumbData = {
            title: 'Personal info',
            description: 'Please Enter your first name and last name',
            backLink: ''
          }
        }
      }
    )
    const form = new PersonalInfoForm(this.userService.userData.value!);
    this.userEmail = this.userService.userData.value!.email
    this.form = this._fb.formGroup(form) as RxFormGroup;
    this.settingService.getCountries().pipe(
      takeUntilDestroyed(this.destroyRef),
      mergeMap((countryList) =>
        iif(() => !this.form.get('phone_number').get('number').value,
          this.settingService.getIpInfo().pipe(
            map(ipInfo => {
              return ({countryList, ipInfo});
            })
          ), of({countryList, ipInfo: null})),
      )).subscribe(
      (res) => {
        this.countryList = res.countryList
        if (res.ipInfo) {
          const countrySelected = this.countryList.find(((a: any) => a.code === res.ipInfo.country))!
          this.form.get('phone_number').patchValue({
            prefix: countrySelected.dial_code,
            country_code: countrySelected.code,
          })
        }
      }
    )
  }

  submit() {
    if (this.form.valid) {
      this.userService.updateUser(
        {
          ...this.form.value,
        }).pipe(takeUntilDestroyed(this.destroyRef)).subscribe(
        () => {
          this.userService.userData = {...this.userService.userData.value, ...this.form.value}
          this.toast.success('your profile successfully updated')
          this.router.navigate(['/']).then()
        }
      )

    } else {
      markFormGroupTouched(this.form)
    }
  }


  onSelectedCountry(value: string) {
    const countrySelected = this.countryList.find((a) => a.code === value)
    this.form.get('phone_number').get('prefix').patchValue(countrySelected?.dial_code)
    this.form.get('phone_number').get('country_code').patchValue(countrySelected?.code)
  }
}
