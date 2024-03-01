import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit
} from '@angular/core';
import {map, Observable, of} from "rxjs";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {DomSanitizer} from "@angular/platform-browser";
import {AsyncPipe, CommonModule} from "@angular/common";

@Component({
  selector: 'app-inline-svg',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    AsyncPipe,
  ],
  templateUrl: './inline-svg.component.html',
  styleUrl: './inline-svg.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InlineSvgComponent implements OnInit {
  @Input() src!: string;
  @Input() fill: string = '#fff'
  @Input() width?: string;
  @Input() height? :string;
  protected svgIcon$!: Observable<any>;

  constructor(private httpClient: HttpClient,
              private sanitizer: DomSanitizer) {
  }

  ngOnInit() {
    if (!this.src) {
      this.svgIcon$ = of(null);
      return;
    }
    this.svgIcon$ = this.httpClient.get(this.src, {responseType: 'text'})
      .pipe(
        map( value => {
          if (this.width && this.height){
            return value.replaceAll('<svg' , `<svg style="width: ${this.width}; height: ${this.height}"`)
          }else{
            return value
          }
        }),
        map(value => value.replaceAll('<path', `<path style="fill: ${this.fill}"`)),
        map(value => this.sanitizer.bypassSecurityTrustHtml(value)),
      )
  }
}
