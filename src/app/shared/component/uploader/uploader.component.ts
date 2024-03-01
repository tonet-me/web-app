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

@Component({
  selector: 'app-uploader',
  standalone: true,
  imports: [
    InlineSvgComponent
  ],
  templateUrl: './uploader.component.html',
  styleUrl: './uploader.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UploaderComponent {
  @Input() imageUrl: string = '';
  @Output() imageUrlChange: EventEmitter<string> = new EventEmitter<string>()
  protected imageURL = signal<string>('')

  constructor(private uploaderService: UploaderService, private destroyRef: DestroyRef) {
    effect(() => {
      if (this.imageUrl) {
        this.imageURL.set(this.imageUrl)
      }
    }, {allowSignalWrites: true});
  }

  protected previewSelectedImage(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.imageURL.update(() => reader.result as string)
    }
    reader.readAsDataURL(file)
    this.uploaderService.uploadImage(file).pipe(takeUntilDestroyed(this.destroyRef)).subscribe(
      (res) => {
        this.imageUrlChange.emit(res['file-name'])
      }
    );
  }

}
