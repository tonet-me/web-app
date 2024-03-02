import {
  ChangeDetectionStrategy,
  Component, DestroyRef, effect,
  ElementRef,
  EventEmitter,
  Input, OnInit,
  Output,
  signal,
  ViewChild
} from '@angular/core';
import {InlineSvgComponent} from "@shared/component/inline-svg/inline-svg.component";
import {UploaderService} from "@shared/services/uploader.service";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {DomSanitizer} from "@angular/platform-browser";
import {ImageCroppedEvent, ImageCropperModule, LoadedImage} from "ngx-image-cropper";
import {ModalComponent} from "@shared/component/modal/modal.component";
import {mergeMap} from "rxjs";

@Component({
  selector: 'app-uploader',
  standalone: true,
  imports: [
    InlineSvgComponent,
    ImageCropperModule,
    ModalComponent
  ],
  templateUrl: './uploader.component.html',
  styleUrl: './uploader.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UploaderComponent {
  @Input() imageUrl: string = '';
  @Output() imageUrlChange: EventEmitter<string> = new EventEmitter<string>()
  protected _imageChangedEvent: any = '';
  protected _croppedImage: any = '';
  protected imageURL = signal<string>('')

  constructor(private uploaderService: UploaderService,
              private destroyRef: DestroyRef) {
    effect(() => {
      if (this.imageUrl) {
        this.imageURL.set(this.imageUrl)
      }
    }, {allowSignalWrites: true});
  }

  protected previewSelectedImage() {
    this.uploaderService.getFileFromBlobUrl(this._croppedImage)
      .pipe(
        mergeMap((res) => this.uploaderService.uploadImage(res)),
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

}
