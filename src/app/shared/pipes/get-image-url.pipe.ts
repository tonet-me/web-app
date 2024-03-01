import { Pipe, PipeTransform } from '@angular/core';
import {environment} from "@environments/environment";

@Pipe({
  name: 'getImageUrl',
  standalone: true
})
export class GetImageUrlPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): string {
    return  environment.apiUrl + 'files/profile/' + value;
  }

}
