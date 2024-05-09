import {Component, OnInit} from '@angular/core';
import {StepsService} from "@shared/services/steps.service";
import {socialMedia, socialMediaForm} from "@app/modules/card-management/models/card-management.model";
import {RxFormBuilder, RxFormGroup, RxwebValidators} from "@rxweb/reactive-form-validators";
import {FormArray} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {CardManagementService} from "@app/modules/card-management/services/card-management.service";
import {socialMediaList} from "@shared/models/social_media.model";

@Component({
  templateUrl: './social-media.component.html',
  styleUrl: './social-media.component.scss'
})
export class SocialMediaComponent implements OnInit {
  socialMedia!: socialMediaForm;
  socialMediaFormGroup!: RxFormGroup

  constructor(private stepService: StepsService,
              private router: Router,
              private activeRoute: ActivatedRoute,
              private cardManagementService: CardManagementService,
              private _fb: RxFormBuilder) {
  }

  ngOnInit() {
    this.stepService.activeStepSubject$.next(2)
    this.socialMedia = new socialMediaForm()
    this.socialMedia.socialMedias = new Array<socialMedia>();
    socialMediaList.map(res => {
      const existingSocialMedia = this.cardManagementService.cardStoreData()?.social_medias?.find((item) => item.type === res.id);
      const title = existingSocialMedia ? existingSocialMedia.value : '';
      const active = !!existingSocialMedia;
      this.socialMedia.socialMedias.push(new socialMedia({type: res.id, name: res.name, title, active}));
    });
    this.socialMediaFormGroup = <RxFormGroup>this._fb.formGroup(this.socialMedia);
    if (this.cardManagementService.cardStoreData()?.social_medias?.length! > 0) {
      let formArray = this.socialMediaFormGroup.controls['socialMedias'] as FormArray;
      (formArray.controls as RxFormGroup[]).map(
        (form) => {
          if (form.get('active')?.value) {
            this.setSocialMediaValidation(form)
          }
        }
      );
    }
  }

  toggle({item, inputField}: { item: RxFormGroup, inputField: HTMLInputElement }) {
    !item.value.active ? this.setSocialMediaValidation(item) : this.clearSocialMediaValidation(item)
    item.get('title')!.updateValueAndValidity()
    setTimeout(() => inputField.focus())
  }

  private setSocialMediaValidation(item: RxFormGroup) {
    item.get('title')!.setValidators([RxwebValidators.required(), RxwebValidators.url()])
    item.get('active')?.patchValue(true)
  }

  private clearSocialMediaValidation(item: RxFormGroup) {
    item.get('title')!.clearValidators()
    item.get('active')?.patchValue(false)
  }

  submit() {
    if (this.socialMediaFormGroup.valid) {
      let formArray = this.socialMediaFormGroup.controls['socialMedias'] as FormArray
      const value = formArray.controls.filter(a => a.value.active === true).map((a) => {
        return {type: a.value.type, value: a.value.title}
      })
      this.cardManagementService.cardStoreData.update((res) => {
        return {...res!, social_medias: value}
      })
      this.router.navigate(['../contract-information'], {relativeTo: this.activeRoute}).then()
    }
  }
}
