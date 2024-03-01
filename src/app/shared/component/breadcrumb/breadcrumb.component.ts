import {ChangeDetectionStrategy, Component, input, Input} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {Location, NgIf} from "@angular/common";
import {InlineSvgComponent} from "@shared/component/inline-svg/inline-svg.component";

@Component({
  selector: 'app-breadcrumb',
  standalone: true,
  imports: [
    RouterLink,
    InlineSvgComponent,
    NgIf
  ],
  templateUrl: './breadcrumb.component.html',
  styleUrl: './breadcrumb.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BreadcrumbComponent {
  @Input() title!: string;
  @Input() description!: string;
  @Input() backLink?: string

  constructor(public location: Location, private router: Router) {
  }

  navigateBackLink() {
    if (this.backLink) {
      this.router.navigate([this.backLink]).then()
    } else if (this.backLink == 'back') {
      this.location.back()
    }
  }
}
