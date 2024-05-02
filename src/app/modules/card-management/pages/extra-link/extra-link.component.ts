import {Component, DestroyRef, OnInit} from '@angular/core';
import {StepsService} from "@shared/services/steps.service";
import {
  EmailsForm,
  extraLink,
  ExtraLinkForm,
  PhoneNumbersForm
} from "@app/modules/card-management/models/card-management.model";
import {RxFormBuilder, RxFormGroup} from "@rxweb/reactive-form-validators";
import {FormArray} from "@angular/forms";
import {CardManagementService} from "@app/modules/card-management/services/card-management.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";

@Component({
  templateUrl: './extra-link.component.html',
  styleUrl: './extra-link.component.scss'
})
export class ExtraLinkComponent implements OnInit {
  form!: RxFormGroup;
  submitBtnText!: string;
  cardId!: string;

  constructor(private stepService: StepsService,
              private cardManagementService: CardManagementService,
              private router: Router,
              private destroyRef: DestroyRef,
              private activeRote: ActivatedRoute,
              private toasterService: ToastrService,
              private _fb: RxFormBuilder) {
  }

  ngOnInit() {
    this.cardId = this.activeRote.parent?.snapshot.params!['id']
    this.submitBtnText = this.cardId ? 'Confirm and Modify Card' : 'Confirm and Create Card'
    this.stepService.activeStepSubject$.next(4)
    const extraLinkData = this.cardManagementService.cardStoreData()?.links ?? [{}];
    const extraLinkForm = new ExtraLinkForm()
    extraLinkForm.extraLinks = new Array<extraLink>();
    extraLinkData.map((res: any) => {
      extraLinkForm.extraLinks.push(new extraLink({
        title: res.title || '',
        value: res.value || ''
      }));
    });
    this.form = <RxFormGroup>this._fb.formGroup(extraLinkForm);
  }

  onSubmit() {
    if (this.form.valid) {
      this.cardManagementService.cardStoreData.update((res) => {
        return {...res!, links: this.form.value.extraLinks}
      })

      if (this.cardId) {
        this.cardManagementService.modifyCard(this.cardId, this.cardManagementService.cardStoreData()!).pipe(
          takeUntilDestroyed(this.destroyRef)
        ).subscribe(
          () => {
            this.toasterService.success('Card Modified Successfully');
            this.router.navigate(['/']).then()
          }
        )
      } else {
        this.cardManagementService.addCard(this.cardManagementService.cardStoreData()!).pipe(
          takeUntilDestroyed(this.destroyRef)
        ).subscribe(
          () => {
            this.toasterService.success('Card Created Successfully');
            this.router.navigate(['/']).then()
          }
        )
      }
    }
  }

  onRemoveFormControl(index: number) {
    let formArray = this.form.controls['extraLinks'] as FormArray;
    formArray.removeAt(index)
  }

  onAddFormControl() {
    let formArray = this.form.get('extraLinks') as FormArray;
    formArray.push(this._fb.formGroup(new extraLink()))
  }
}
