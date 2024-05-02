import {Component, OnInit} from '@angular/core';
import {DefaultValidationService} from "@shared/services/default-validation.service";

@Component({
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent implements OnInit {
  constructor(private defaultValidationService: DefaultValidationService) {
  }

  ngOnInit() {
    this.defaultValidationService.setDefaultValidation()
  }
}
