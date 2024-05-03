import {Component, DestroyRef, OnInit} from '@angular/core';
import {RxFormBuilder, RxFormGroup} from "@rxweb/reactive-form-validators";
import {markFormGroupTouched} from "@shared/helper/my-helper";
import {ActivatedRoute, Params, Router} from '@angular/router';
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {PersonalInfoForm} from "@app/modules/settings/models/setting.model";
import {UserService} from "@shared/services/user.service";
import {ToastrService} from "ngx-toastr";
import {countryModel} from "@shared/models/location.model";

@Component({
  templateUrl: './modify-personal-info.component.html',
  styleUrl: './modify-personal-info.component.scss'
})
export class ModifyPersonalInfoComponent implements OnInit {
  form!: RxFormGroup;
  countryList: countryModel[] = []
  userEmail!: string;
  new_user: boolean = false
  breadCrumbData = {title: 'Personal info', description: 'Enter your personal info', backLink: '/setting'}

  constructor(private _fb: RxFormBuilder,
              private router: Router,
              private destroyRef: DestroyRef,
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
    this.activatedRoute.data.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((data) => {
      const res = data["countries"];
      this.countryList = res.countryList
      if (res.ipInfo) {
        const countrySelected = this.countryList.find((a => a.code === res.ipInfo.country))!
        this.form.get('phone_number')?.patchValue({
          prefix: countrySelected.dial_code,
          country_code: countrySelected.code,
        })
      }
    })
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
    this.form.get('phone_number')?.get('prefix')?.patchValue(countrySelected?.dial_code)
    this.form.get('phone_number')?.get('country_code')?.patchValue(countrySelected?.code)
  }
}
