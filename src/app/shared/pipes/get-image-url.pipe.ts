import { Pipe, PipeTransform } from '@angular/core';
import {environment} from "@environments/environment";

@Pipe({
  name: 'getImageUrl',
  standalone: true
})
export class GetImageUrlPipe implements PipeTransform {

  transform(value: unknown, type: string): string {
    return  environment.apiUrl + `files/${type}s/profile/` + value;
  }

}
