import {Component, DestroyRef, OnInit} from '@angular/core';
import {StepsService} from "@shared/services/steps.service";
import {ContactInfoForm, EmailsForm, PhoneNumbersForm} from "@app/modules/card-management/models/card-management.model";
import {RxFormBuilder, RxFormGroup} from "@rxweb/reactive-form-validators";
import {FormArray} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {CardManagementService} from "@app/modules/card-management/services/card-management.service";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {countryModel} from "@shared/models/location.model";

@Component({
  templateUrl: './contact-information.component.html',
  styleUrl: './contact-information.component.scss'
})
export class ContactInformationComponent implements OnInit {
  form!: RxFormGroup;
  countryList: countryModel[] = []
  countrySelected!: countryModel;

  constructor(private stepService: StepsService,
              private router: Router,
              private destroyRef: DestroyRef,
              private cardManagementService: CardManagementService,
              private activatedRoute: ActivatedRoute,
              private _fb: RxFormBuilder) {
  }

  ngOnInit() {
    this.activatedRoute.data.pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(
      (data) => {
        const res = data["countries"];
        this.countryList = res.countryList
        if (res.ipInfo) {
          this.countrySelected = this.countryList.find((a => a.code === res.ipInfo.country))!
          this.stepService.activeStepSubject$.next(3)
          const contactInfoForm = new ContactInfoForm()
          contactInfoForm.phoneNumbers = new Array<PhoneNumbersForm>();
          const phoneNumbersData = this.cardManagementService.cardStoreData()?.phone_numbers ?? [];
          const emailsData = this.cardManagementService.cardStoreData()?.emails ?? [];
          phoneNumbersData.map(res=> {
            contactInfoForm.phoneNumbers.push(new PhoneNumbersForm({
              title: res.title || '',
              number: res?.value?.number || '',
              country_code: res?.value?.country_code || this.countrySelected.code,
              prefix: res?.value?.prefix || this.countrySelected.dial_code
            }));
          });
          contactInfoForm.emails = new Array<EmailsForm>();
          emailsData.map(res => {
            contactInfoForm.emails.push(new EmailsForm({
              title: res.title || '',
              value: res.value || '',
            }));
          })
          this.form = <RxFormGroup>this._fb.formGroup(contactInfoForm);
        }
      })

  }

  onAddFormControl(name: 'phoneNumbers' | 'emails') {
    let formArray = this.form.controls[name] as FormArray;
    if (name === 'phoneNumbers') {
      formArray.push(this._fb.formGroup(new PhoneNumbersForm(
        {
          title: '',
          number: '',
          country_code: this.countrySelected.code,
          prefix: this.countrySelected.dial_code
        }
      )))
    } else {
      formArray.push(this._fb.formGroup(new EmailsForm()))
    }
  }


  onRemoveFormControl({name, index}: { name: "phoneNumbers" | "emails"; index: number }) {
    let formArray = this.form.controls[name] as FormArray;
    formArray.removeAt(index)
  }

  onSubmit() {
    if (this.form.valid) {
      this.cardManagementService.cardStoreData.update((res) => {
        return {
          ...res!,
          emails: this.form.value.emails,
          phone_numbers: this.form.value.phoneNumbers.map((a: PhoneNumbersForm) => {
            return {title: a.title, value: {number: a.number, prefix: a.prefix, country_code: a.country_code}}
          })
        }
      })
      this.router.navigate(['../extra-link'], {relativeTo: this.activatedRoute}).then()
    }
  }

  onSelectedCountry(value: string) {
    const countrySelected = this.countryList.find((a) => a.code === value)
  }
}
