import {Component, OnInit} from '@angular/core';
import {UserService} from "@shared/services/user.service";
import {environment} from "@environments/environment";
import {UploaderService} from "@shared/services/uploader.service";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent  implements OnInit{
  constructor(public userService: UserService) {
  }
  ngOnInit() {
  }



}
