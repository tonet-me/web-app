import {
  ChangeDetectionStrategy,
  Component, DestroyRef, effect,
  EventEmitter,
  Input,
  Output,
  signal,
} from '@angular/core';
import {InlineSvgComponent} from "@shared/component/inline-svg/inline-svg.component";
import {UploaderService} from "@shared/services/uploader.service";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {ImageCropperModule} from "ngx-image-cropper";
import {ModalComponent} from "@shared/component/modal/modal.component";
import {mergeMap} from "rxjs";
import {GetImageUrlPipe} from "@shared/pipes/get-image-url.pipe";
import e from "express";
import {ToastrService} from "ngx-toastr";
import {NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-uploader',
  standalone: true,
  imports: [
    InlineSvgComponent,
    ImageCropperModule,
    ModalComponent,
    NgOptimizedImage
  ],
  templateUrl: './uploader.component.html',
  styleUrl: './uploader.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UploaderComponent {
  @Input() imageUrl: string = '';
  @Input() type: string = 'user'
  @Output() imageUrlChange: EventEmitter<string> = new EventEmitter<string>()
  protected _imageChangedEvent: any = '';
  protected _croppedImage: any = '';
  protected imageURL = signal<string>('')

  constructor(private uploaderService: UploaderService,
              private toastr: ToastrService,
              private destroyRef: DestroyRef) {
    effect(() => {
      if (this.imageUrl) {
        this.imageURL.set(new GetImageUrlPipe().transform(this.imageUrl, this.type))
      }
    }, {allowSignalWrites: true});
  }

  protected previewSelectedImage() {
    this.uploaderService.getFileFromBlobUrl(this._croppedImage)
      .pipe(
        mergeMap((res) => this.uploaderService.uploadImage(res, this.type)),
        takeUntilDestroyed(this.destroyRef)
      ).subscribe(
      (res) => {
        this.imageUrlChange.emit(res['file-name'])
        this.imageURL.set(this._croppedImage);
        this._imageChangedEvent = '';
      }
    )
  }

  imageCropped(event: any) {
    this._croppedImage = event.objectUrl;
    // event.blob can be used to upload the cropped image
  }

  onUploadFile(event: Event) {
    const file = (event.target as HTMLInputElement).files![0]
    if (file.size < 2000000) {
      this._imageChangedEvent = event;
      this._croppedImage = event
    } else {
      this.toastr.error('File Too Large: Please keep uploads under 2MB')
    }
  }
}
