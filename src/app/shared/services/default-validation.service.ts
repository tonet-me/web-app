import {Injectable, OnInit} from '@angular/core';
import {setFormConfig} from "@shared/helper/my-helper";

@Injectable({
  providedIn: 'root'
})
export class DefaultValidationService implements OnInit {

  constructor() {
    setFormConfig()
  }

  ngOnInit() {

  }
}
